import React, { useState } from "react";
import { Button } from "reactstrap";
import UploadModal from "./UploadModal";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="mt-5 text-center upload-section" style={{ height: "15rem", width: "96.5vw", borderRadius: "2rem" }}>
                <div className="d-flex justify-content-between align-items-center" style={{ width: "85vw" }}>
                    <button className="upload-btn" size="lg" onClick={() => setModalOpen(true)}>Upload X-Ray</button>
                    <img src="/images/dashboard.png" alt="Dashboard Icon" className="img-fluid" style={{ height: "16rem" }} />
                </div>
                <UploadModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
            </div>
        </div>
    );
}

export default Dashboard;