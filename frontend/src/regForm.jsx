import React from 'react';
import "./forms.css";

const RegForm = () => {
    return <div className="container">
        <h3>REGISTER</h3>
        <form type="submit" className='form'>    
            <input type = "text" placeholder = "Username"></input>
            <input name='' type = "email" placeholder = "Email ID"></input>
            <input name='pass' type = "password" placeholder = "Password" ></input>
            <input type = "password" placeholder = "Confirm Password"></input>
            <button onclick="to  be added">SUBMIT</button>
        </form>
    </div>

};
export default RegForm;
