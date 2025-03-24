import React, { useState, useCallback } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";

const UploadModal = ({ isOpen, toggle }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });

    const handleUpload = () => {
        if (selectedFile) {
            console.log("Uploading file:", selectedFile);
            toggle(); // Close modal after upload
        }
    };

    return (
        <div style={{borderRadius:"2rem"}}>
            <Modal
                className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: "800px", minHeight: "400px" }}
                isOpen={isOpen}
                toggle={toggle}>
                <ModalHeader toggle={toggle}>Upload Image</ModalHeader>
                <ModalBody>
                    <div
                        {...getRootProps()}
                        style={{
                            border: "2px dashed #000",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            height: "20rem"
                        }}
                    >
                        <input {...getInputProps()} />
                        {selectedFile ? (
                            <p>{selectedFile.name}</p>
                        ) : (
                            <p>Drag & Drop an image here or click to select</p>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpload} disabled={!selectedFile}>
                        Upload
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default UploadModal;
