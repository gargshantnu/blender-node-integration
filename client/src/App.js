import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import EditProperties from "./components/EditProperties";
import RenderModel from "./components/NewRenderModel";
import "./App.css";
import ExportButton from "./components/ExportButton";
import axios from "axios";

const App = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [editProperties, setEditProperties] = useState({
        fileName: "",
        scale: { x: 1.0, y: 1.0, z: 1.0 },
        position: { x: 0.0, y: 0.0, z: 0.0 },
    });

    const onFileChange = (file) => {
        console.log("server file", file);
        setFile(file);
        setEditProperties({
            fileName: file.name,
            scale: { x: 1.0, y: 1.0, z: 1.0 },
            position: { x: 0.0, y: 0.0, z: 0.0 },
        });
    };

    const handleEditProperties = (fileName, scale, position) => {
        setEditProperties({
            fileName,
            scale: { ...scale },
            position: { ...position },
        });
    };
    const handleExport = async (type) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/export/${type}`,
                {
                    fileName: uploadedFile,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data]);

            const contentDisposition = response.headers.get(
                "Content-Disposition"
            );
            let filenameMatch =
                contentDisposition &&
                contentDisposition.match(/filename="(.+)"$/);
            filenameMatch = filenameMatch
                ? filenameMatch[1]
                : `${uploadedFile.split(".")[0]}.${type}`;

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filenameMatch;
            link.click();

            console.log("Properties edited successfully");
        } catch (error) {
            console.error("Error exporting:", error.message);
        }
    };

    return (
        <div>
            <h1>Blender-Three.js Project for 3D work</h1>
            <FileUpload
                onFileChange={onFileChange}
                setUploadedFile={setUploadedFile}
            />
            {uploadedFile && (
                <div>
                    <EditProperties
                        fileName={uploadedFile}
                        onEditProperties={handleEditProperties}
                    />
                    <RenderModel
                        editProperties={{ ...editProperties, file: file }}
                    />
                    <ExportButton onExport={handleExport} />
                </div>
            )}
        </div>
    );
};

export default App;
