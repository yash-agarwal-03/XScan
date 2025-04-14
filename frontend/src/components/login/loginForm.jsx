import React,{useState} from 'react';
import "./forms.css";
import { Login } from '../../api/Api';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();


        const data = {
            email: email,
            password: password,
        };
        console.log(data);
        Login(data);
    }

    return <div className="formcontainer">
        <h3>LOGIN</h3>
        <form className='form' onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
}
export default LoginForm;