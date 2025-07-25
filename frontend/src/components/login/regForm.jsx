import React from "react";
import "./forms.css";
import { Register } from "../../api/Api";
import showToast from "../common/Toaster";
const RegForm = () => {
    const handleSubmit = async (event) => {
            console.log("register submit hit")
            event.preventDefault();
            
            const form=event.target.closest("form");
            const data={
                username:form[0].value,
                email:form[1].value,
                password:form[2].value,
                confirmPassword:form[3].value
            }
            const response= await Register(data);
            showToast(response.success?("Success"):("Error"),response.success?("Success"):("Error"),response.message);
    };
    return (
        <div className="formcontainer">
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
