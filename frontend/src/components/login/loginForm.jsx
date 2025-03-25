import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { Login } from '../../api/Api';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async(event) => {
        event.preventDefault();


        const data = {
            email: email,
            password: password,
        };
        console.log(data);
        const response = await Login(data);
        console.log(response);
        if (response.success) {
            localStorage.setItem("user", JSON.stringify(response.user)); // Store user info
            navigate("/dashboard");
        } else {
            alert(response.message); // Show error message
        }
    }

    return <div className="container">
        <h3>LOGIN</h3>
        <form className='form' onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
}
export default LoginForm;