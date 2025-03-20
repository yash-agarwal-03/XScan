import React from "react";
import "./forms.css";
import { Register } from "./api/Api";
const RegForm = () => {
    const handleSubmit = (event) => {
            console.log("register submit hit")
            event.preventDefault();
            
            const form=event.target.closest("form");
            const data={
                username:form[0].value,
                email:form[1].value,
                password:form[2].value,
                confirmPassword:form[3].value
            }
            Register(data);
    };
    return (
        <div className="container">
            <h3>REGISTER</h3>
            <form className="form">
                <input type="text" placeholder="Username"></input>
                <input type="email" placeholder="Email ID"></input>
                <input type="password" placeholder="Password"></input>
                <input type="password" placeholder="Confirm Password"></input>
                <button onClick={handleSubmit}>SUBMIT</button>
            </form>
        </div>
    );
};
export default RegForm;
