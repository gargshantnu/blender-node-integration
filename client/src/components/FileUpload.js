import React, { useState } from "react";

const FileUpload = ({ onFileChange, setUploadedFile }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        onFileChange(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            fetch("http://localhost:3001/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setUploadedFile(data.fileName);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
