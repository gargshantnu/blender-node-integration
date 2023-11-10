import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import EditProperties from './components/EditProperties';
import RenderModel from './components/NewRenderModel';
import './App.css';

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editProperties, setEditProperties] = useState({
    fileName: '',
    scale: { x: 1.0, y: 1.0, z: 1.0 },
    position: { x: 0.0, y: 0.0, z: 0.0 },
  });

  const handleFileUpload = (file) => {
    setUploadedFile(file);
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

  return (
    <div>
      <h1>Your Blender-Three.js Project</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {uploadedFile && (
        <div>
          <EditProperties
            fileName={uploadedFile.fileName}
            onEditProperties={handleEditProperties}
          />
          <RenderModel editProperties={{ ...editProperties, file: uploadedFile }} />
        </div>
      )}
    </div>
  );
};

export default App;
