import React from "react";
import Form from "./components/login/form.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard.jsx";
import ImageList from "./components/dashboard/imageList.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/imageList" element={<ImageList />} />
        {/* Below are example if you want to checck the working */}
        {/* <Route path="/login" element={<LoginForm />} /> */}
        {/* <Route path="/register" element={<RegForm/>} /> */}
      </Routes>
    </Router>
  );
}
export default App;