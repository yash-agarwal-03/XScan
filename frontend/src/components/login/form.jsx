import React, { useState } from "react";
import "./forms.css";
import LoginForm from "./loginForm";
import RegForm from "./regForm";
import { Button } from "reactstrap";
const Form = () => {

    const [state, setState] = useState("login");
    return (
        <div className="form">
            <Button onClick={() => setState("login")}>Login</Button>
            <Button onClick={() => setState("register")}>Register</Button>
            {state === "login" ?
                (<LoginForm />) :
                (<RegForm />)
            }
      </div>
  );
};
export default Form;
