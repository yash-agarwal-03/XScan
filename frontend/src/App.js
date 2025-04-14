import React from "react";
import Form from "./components/login/form.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard.jsx";
function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Form />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     {/* Below are example if you want to checck the working */}
    //     {/* <Route path="/login" element={<LoginForm />} /> */}
    //     {/* <Route path="/register" element={<RegForm/>} /> */}
    //   </Routes>
    // </Router>
    <Form />
  );
}
export default App;