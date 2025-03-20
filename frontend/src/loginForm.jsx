import React from 'react';
import "./forms.css";
import { Input } from 'reactstrap';
import { Login } from './api/Api';

const LoginForm = () => {
    const handleclick = (event) => {
        event.preventDefault();
        console.log("hit")
        const form = event.target.closest("form");  // Get form reference
        const data = {
            email: form[0].value,
            password: form[1].value,
        };
        Login(data);
    }
    return <div className="container">
        <h3>LOGIN</h3>
        <form className='form'>
            <input type="email" placeholder="Email ID"></input>
            <input type="password" placeholder="Password"></input>
            <button onClick={handleclick}>SUBMIT</button>
        </form>
    </div>

};
export default LoginForm;
