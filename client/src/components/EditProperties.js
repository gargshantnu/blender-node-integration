import React, { useState } from 'react';

const EditProperties = ({ fileName, onEditProperties }) => {
  const [scale, setScale] = useState(1.0);
  const [position, setPosition] = useState(0.0);

  const handleEdit = () => {
    onEditProperties(fileName, scale, position);
  };

  return (
    <div>
      <h2>Edit Properties</h2>
      <label>
        Scale:
        <input
          type="number"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
      </label>
      <label>
        Position:
        <input
          type="number"
          step="0.1"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </label>
      <button onClick={handleEdit}>Apply Changes</button>
    </div>
  );
};

export default EditProperties;
