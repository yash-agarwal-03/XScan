import React, { useState } from "react";
import "./forms.css";
import LoginForm from "./loginForm";
import RegForm from "./regForm";
import { Button } from 'reactstrap';

const Form = () => {
    const [state, setState] = useState("login");

    return (
        <div className="formcontainer container">
            <div className="button-group">
                <Button className={state === "login" ? "active-btn" : "inactive-btn"} onClick={() => setState("login")}>Login</Button>
                <Button className={state === "register" ? "active-btn" : "inactive-btn"} onClick={() => setState("register")}>Register</Button>
            </div>
            {state === "login" ? <LoginForm /> : <RegForm />}
        </div>
    );
};

export default Form;
