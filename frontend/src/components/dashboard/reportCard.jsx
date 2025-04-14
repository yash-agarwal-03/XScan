import React,{ useState} from "react";
import ReportModal from "./reportModal";

const ReportCard = (image,id) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="report-card upload-section" style={{height:"12rem", width:"20rem"}} onClick={() => setModalOpen(true)}>
            <ReportModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
        </div>
    )
}
export default ReportCard;