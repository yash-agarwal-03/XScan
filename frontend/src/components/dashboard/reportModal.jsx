import React, {useState} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ReportModal = ({ isOpen, toggle }) => {
    return (
        <Modal
            className="modal-dialog modal-dialog-centered modal"
            style={{ maxWidth: "800px", minHeight: "400px" }}
            centered
            isOpen={isOpen}
            toggle={toggle}
        >
            <ModalHeader>Report</ModalHeader>
            <ModalBody className="d-flex" style={{ height:"50vh" }}>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <h2>Body Part</h2>
                    <h2>Condition</h2>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default ReportModal;