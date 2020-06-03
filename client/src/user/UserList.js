import React, {Component} from 'react'
import { Col, Table } from 'react-bootstrap';


class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_user : [],
            lis_users_err : "",
        }
    }

    getUsers = async () => {

        var {all_user, lis_users_err} = this.state;
        try {
            const response  = await fetch("http://localhost:8000/users/get", { method: 'POST'});
            const user_data = await response.json();

            if(user_data && user_data.status === "success") {
                all_user = user_data.data;
                lis_users_err = "";
            } else {
                lis_users_err = (user_data && user_data.data) || "Unexpected error occured";
            }
        } catch (error) {
            lis_users_err = "Unexpected error occured"
        }

        this.setState({
            all_user,
            lis_users_err
        });
    }

    componentDidMount() {
        this.getUsers();
    }
    
    componentWillReceiveProps(props) {
        if(props.dataAdded === true) {
            this.getUsers();
        }
    }
    
    render() {
        const {all_user} = this.state;
        return (
            <Col md={{ span: 8, offset: 2 }}>
            <hr/>
                <h3 className="text-center">Users List</h3><br/>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email Id</th>
                            <th>Address Line 1</th>
                            <th>Address Line 2</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_user.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.username}</td>
                                <td>{obj.email_id}</td>
                                <td>{obj.address_line_1}</td>
                                <td>{obj.address_line_2}</td>
                                <td>{obj.phone_number}</td>
                            </tr>      
                        ))}
                        {all_user.length === 0 &&
                            <tr>
                                <td colSpan="5" className="text-center">No Users data found</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Col>
        )
    }
}

export default UserList;
