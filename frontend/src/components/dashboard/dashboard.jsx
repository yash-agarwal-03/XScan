import React, { useState } from "react";
import { Button } from "reactstrap";
import UploadModal from "./UploadModal";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="container mt-5 text-center">
            <Button color="primary" onClick={() => setModalOpen(true)}>
                Open Upload Modal
            </Button>
            <UploadModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
        </div>
    );
}

export default Dashboard;