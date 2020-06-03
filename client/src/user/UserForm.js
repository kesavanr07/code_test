import React, {Component} from 'react'
import { Col, Form, Button, FormControl, Jumbotron, Alert } from 'react-bootstrap';
import UserList from './UserList.js';


class UserForm extends Component {
    constructor(props) {
        super(props);
        const input_fields = {
            username : '',
            email_id : '',
            address_line_1 : '',
            address_line_2 : '',
            phone_number : '',
        };
        this.state = {
            ...input_fields,
            err_msg : {
                is_error : false,
                save_user_msg : "",
                ...input_fields
            },
            data_added : false
        };
    }
    
    getChangedValue = (event) => {
        const { id, value } = event.target;
        const {err_msg} = this.state;

        if(err_msg[id])
            err_msg[id] = "";
            
        this.setState({
            [id] : value,
            err_msg
        });
    }
    
    resetForm = (reset_all = false) => {
        const input_fields = this.state;

        if(reset_all) {
            Object.keys(input_fields.err_msg).map((key) => {
                input_fields.err_msg[key] = (key !== 'is_error') ? '' : false;
            });
        }
        Object.keys(input_fields).map((key) => {
            if(key !== 'err_msg') {
                input_fields[key] = (key !== 'data_added') ? '' : false;
            }
        });
        this.setState({
            input_fields
        });
    }

    closeAlert = () => {
        const {err_msg}       = this.state;
        
        err_msg.is_error      = false;
        err_msg.save_user_msg = '';

        this.setState({
            err_msg
        });
    }

    submitUserDetails = () => {
        const input_fields = this.state;
        const email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const phone_reg =  /^\d+$/;

        Object.keys(input_fields.err_msg).map((key) => {
            input_fields.err_msg[key] = (key !== 'is_error') ? '' : false;
        });

        Object.keys(input_fields).map((key) => {
            if(key !== 'err_msg' && key !== 'data_added') {
                if(!input_fields[key]) {
                    input_fields.err_msg[key] = "Please enter " +(key).replace(/_/g, " ");
                    input_fields.err_msg.is_error = true;
                } else {
                    if(key === 'email_id' && email_reg.test(input_fields[key]) === false)  {
                        input_fields.err_msg[key] = "Please enter valid email id";
                        input_fields.err_msg.is_error = true;
                    }
                        
                    if(key === 'phone_number' && phone_reg.test(input_fields[key]) === false) {
                        input_fields.err_msg[key] = "Please enter valid phone number";
                        input_fields.err_msg.is_error = true;
                    }
                }
            }
        });
        
        this.setState({
            ...input_fields
        });

        if(input_fields.err_msg.is_error === false)
            this.addUser();
    }

    addUser = async () => {

        const {username, email_id, address_line_1, address_line_2, phone_number, err_msg} = this.state;
        var {data_added} = this.state;
        data_added = err_msg.is_error = false;
        err_msg.save_user_msg   = "";
        
        try {
            const response = await fetch("http://localhost:8000/users/save", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },  
                body : JSON.stringify({
                    username,
                    email_id,
                    address_line_1,
                    address_line_2,
                    phone_number
                })
            });
            const user_data = await response.json();

            if(user_data && user_data.status === "success") {
                err_msg.save_user_msg = user_data.data;
                data_added = true;
            } else {
                err_msg.save_user_msg = (user_data && user_data.data) || "Unexpected error occured";
                err_msg.is_error = true;
            }
        } catch (error) {
            err_msg.save_user_msg = "Unexpected error occured"
            err_msg.is_error= true;
        }
        if(data_added === true) {
            this.setState({
                data_added
            });
            this.resetForm();
        } else {
            this.setState({
                err_msg,
            });
        }
       
    }

    render() {
        const input_fields = this.state;
        
        return (
            <Jumbotron>

            <Col md={{ span: 4, offset: 4 }}>
                {!input_fields.err_msg.is_error && input_fields.err_msg.save_user_msg !== "" &&
                    <Alert variant="success" onClose={this.closeAlert} dismissible>{input_fields.err_msg.save_user_msg}</Alert>
                }
                {input_fields.err_msg.is_error && input_fields.err_msg.save_user_msg !== "" &&
                    <Alert variant="danger" onClose={this.closeAlert} dismissible>{input_fields.err_msg.save_user_msg}</Alert>
                }
                
                <h3 className="text-center">Add User</h3><br/>
                <Form>
                    <Form.Group>
                        <FormControl 
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={input_fields.username}
                            onChange={this.getChangedValue}
                        />
                        {input_fields.err_msg.username &&
                            <Form.Text className="text-error">{input_fields.err_msg.username}</Form.Text>
                        }
                    </Form.Group>
                    <Form.Group>
                        <FormControl 
                            type="text"
                            id="email_id"
                            placeholder="Email Id"
                            value={input_fields.email_id}
                            onChange={this.getChangedValue}
                        />
                        {input_fields.err_msg.email_id &&
                            <Form.Text className="text-error">{input_fields.err_msg.email_id}</Form.Text>
                        }
                    </Form.Group>
                    <Form.Group>
                        <FormControl 
                            type="text"
                            id="address_line_1"
                            value={input_fields.address_line_1}
                            placeholder="Addess line 1"
                            onChange={this.getChangedValue}
                        />
                        {input_fields.err_msg.address_line_1 &&
                            <Form.Text className="text-error">{input_fields.err_msg.address_line_1}</Form.Text>
                        }
                    </Form.Group>
                    <Form.Group>
                        <FormControl 
                            type="text"
                            id="address_line_2"
                            value={input_fields.address_line_2}
                            placeholder="Addess line 2"
                            onChange={this.getChangedValue}
                        />
                        {input_fields.err_msg.address_line_2 &&
                            <Form.Text className="text-error">{input_fields.err_msg.address_line_2}</Form.Text>
                        }
                        </Form.Group>
                    <Form.Group>
                        <FormControl 
                            type="text"
                            id="phone_number"
                            value={input_fields.phone_number}
                            placeholder="Phone Number"
                            onChange={this.getChangedValue}
                            maxLength="10"
                        />
                        {input_fields.err_msg.phone_number &&
                            <Form.Text className="text-error">{input_fields.err_msg.phone_number}</Form.Text>
                        }
                    </Form.Group>
                    <Button variant="secondary" className="pull-right" onClick={()=> {this.resetForm(true)}}>Reset</Button>
                    <Button className="float-right" onClick={this.submitUserDetails}>Add</Button>
                </Form>
            </Col>
            <UserList dataAdded={this.state.data_added}/>
            </Jumbotron>
        )
    }
}

export default UserForm;
