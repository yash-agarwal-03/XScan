import React from "react";
import Form from "./components/login/form.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        {/* Below are example if you want to checck the working */}
        {/* <Route path="/login" element={<LoginForm />} /> */}
        {/* <Route path="/register" element={<RegForm/>} /> */}
      </Routes>
    </Router>
  );
}
export default App;