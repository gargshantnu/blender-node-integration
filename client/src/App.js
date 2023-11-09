import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import EditProperties from './components/EditProperties';
import RenderModel from './components/NewRenderModel';
// import RenderModel from './components/RenderModel';
import './App.css';


const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editProperties, setEditProperties] = useState({
    fileName: '',
    scale: 1.0,
    position: 0.0,
  });

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setEditProperties({
      fileName:file.name,
      scale: parseFloat(1),
      position: parseFloat(1),
    });
  };

  const handleEditProperties = (fileName, scale, position) => {
    setEditProperties({
      fileName,
      scale: parseFloat(scale),
      position: parseFloat(position),
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
          <RenderModel editProperties={{...editProperties, file:uploadedFile}} />
        </div>
      )}
    </div>
  );
};

export default App;