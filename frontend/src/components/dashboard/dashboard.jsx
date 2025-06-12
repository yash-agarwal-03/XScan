import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import UploadModal from "./UploadModal";
import ReportCard from "./reportCard";
import Navbar from "./navbar";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/"); // Redirect to login page
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/"); // Redirect if not logged in
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            {/* NAVBAR */}
            {user ? (
                <Navbar user={user} onLogout={handleLogout} />) :
                (
                <Navbar user={null} onLogout={handleLogout} />) }

            <div className="mt-5 text-center upload-section" style={{ height: "15rem", width: "96.5vw", borderRadius: "2rem" }}>
                <div className="d-flex justify-content-between align-items-center" style={{ width: "85vw" }}>
                    <button className="upload-btn" size="lg" onClick={() => setModalOpen(true)}>Upload X-Ray</button>
                    <img src="/images/dashboard.png" alt="Dashboard Icon" className="img-fluid" style={{ height: "16rem" }} />
                </div>
                <UploadModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
            </div>
            {/* REPORT CARD Mapping Loop */}
            <h1 className="ms-4 mb-5">Reports</h1>
            <ReportCard />
        </div>
    );
}

export default Dashboard;