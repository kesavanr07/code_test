import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import UserForm from './user/UserForm.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <Container>
                <UserForm />
            </Container>
        )
    }
}

export default App;
