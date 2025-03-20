import React from 'react';
import "./forms.css";
import {Input} from 'reactstrap';


const LoginForm = () => {
    return <div className="container">
        <h3>LOGIN</h3>
        <form type="submit" className='form'>     
            <input type = "email" placeholder = "Email ID"></input>
            <input type = "password" placeholder = "Password"></input>
            <button onclick = "submit">SUBMIT</button>
        </form>
    </div>

};
export default LoginForm;
