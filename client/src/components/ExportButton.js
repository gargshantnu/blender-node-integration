import React, { useState } from 'react';

const ExportButton = ({ onExport }) => {
    const [selectedFormat, setSelectedFormat] = useState('fbx');

    const handleFormatChange = (event) => {
      setSelectedFormat(event.target.value);
    };
  
    return (
    <div>
      <label htmlFor="exportFormat">Select Export Format:</label>
      <select id="exportFormat" value={selectedFormat} onChange={handleFormatChange}>
        <option value="fbx">FBX</option>
        <option value="glb">GLB</option>
      </select>
      <button onClick={() => onExport(selectedFormat)}>
        Export Model
      </button>
    </div>
  );
};

export default ExportButton;
