import React, { useState } from "react";

const EditProperties = ({ fileName, onEditProperties }) => {
    const [scale, setScale] = useState({ x: 1.0, y: 1.0, z: 1.0 });
    const [position, setPosition] = useState({ x: 0.0, y: 0.0, z: 0.0 });

    const handleEdit = async () => {
        try {
            const response = await fetch("http://localhost:3001/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName,
                    scale,
                    position,
                }),
            });

            console.log("Properties edited successfully");
            // Update the UI with the result file name
            // onEditProperties(resultFileName, scale, position);
        } catch (error) {
            console.error("Error editing properties:", error.message);
        }
    };

    return (
        <div>
            <h2>Edit Properties</h2>
            <label>
                Scale X:
                <input
                    type="number"
                    step="0.1"
                    value={scale.x}
                    onChange={(e) => setScale({ ...scale, x: e.target.value })}
                />
            </label>
            <label>
                Scale Y:
                <input
                    type="number"
                    step="0.1"
                    value={scale.y}
                    onChange={(e) => setScale({ ...scale, y: e.target.value })}
                />
            </label>
            <label>
                Scale Z:
                <input
                    type="number"
                    step="0.1"
                    value={scale.z}
                    onChange={(e) => setScale({ ...scale, z: e.target.value })}
                />
            </label>

            <label>
                Position X:
                <input
                    type="number"
                    step="0.1"
                    value={position.x}
                    onChange={(e) =>
                        setPosition({ ...position, x: e.target.value })
                    }
                />
            </label>
            <label>
                Position Y:
                <input
                    type="number"
                    step="0.1"
                    value={position.y}
                    onChange={(e) =>
                        setPosition({ ...position, y: e.target.value })
                    }
                />
            </label>
            <label>
                Position Z:
                <input
                    type="number"
                    step="0.1"
                    value={position.z}
                    onChange={(e) =>
                        setPosition({ ...position, z: e.target.value })
                    }
                />
            </label>

            <button onClick={handleEdit}>Apply Changes</button>
        </div>
    );
};

export default EditProperties;
