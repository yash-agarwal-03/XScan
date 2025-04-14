import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { Login } from "../../api/Api";
import showToast from "../common/Toaster";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    const response = await Login(data);
    console.log(response);
    if (response.success) {
      localStorage.setItem("user", JSON.stringify(response.user));
      showToast(response.success?("Success"):("Error"),response.success?("Success"):("Error"),response.message);
      navigate("/dashboard");
    } else {
      showToast(response.success?("Success"):("Error"),response.success?("Success"):("Error"),response.message);
    }
  };

    return <div className="formcontainer">
        <h3>LOGIN</h3>
        <form className='form' onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
};
export default LoginForm;
