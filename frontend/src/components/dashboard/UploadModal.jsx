import React, { useState, useCallback } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { SetImage } from "../../api/Api";
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
            SetImage(selectedFile); // Assuming SetImage is a function to handle the upload
            toggle(); // Close modal after upload
        }
    };

    return (
        <div>
            <Modal
                className="modal-dialog modal-dialog-centered modal"
                style={{ maxWidth: "800px", minHeight: "400px" }}
                centered
                isOpen={isOpen}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>Upload Image</ModalHeader>
                <ModalBody>
                    <div
                        {...getRootProps()}
                        style={{
                            borderRadius: "1rem",
                            border: "2px dashed #3C3D37",
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
