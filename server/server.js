const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("uploads"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token || token !== 'dummyToken') return res.status(401).send('Access denied.');
//   next();
// };

// Route for file upload
app.post("/upload", upload.single("file"), (req, res) => {
    // Save the uploaded file to the uploads folder
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const filePath = path.join(__dirname, "uploads", fileName);

    require("fs").writeFileSync(filePath, req.file.buffer);

    res.status(200).json({ fileName });
});

// Route for editing properties
app.post(
    "/edit",
    // authenticate,
    (req, res) => {
        const { fileName, scale, position } = req.body;

        // Call the Blender script to edit properties
        const editProcess = spawn("blender", [
            "--background",
            "--python",
            path.join(__dirname, "blender-scripts", "edit_properties.py"),
            "--",
            fileName,
            scale,
            position,
        ]);

        editProcess.stdout.on("data", (data) => {
            console.log(`Blender Edit Output: ${data}`);
        });

        editProcess.stderr.on("data", (data) => {
            console.error(`Blender Edit Error: ${data}`);
        });

        editProcess.on("close", (code) => {
            if (code === 0) {
                res.status(200).send("Properties edited successfully");
            } else {
                res.status(500).send("Failed to edit properties");
            }
        });
    }
);

// Route for exporting as GLB
app.post(
    "/export/glb",
    // authenticate,
    (req, res) => {
        const { fileName } = req.body;
        try {
            // Call the Blender script to export as GLB
            const exportProcess = spawn("blender", [
                "--background",
                "--python",
                path.join(__dirname, "blender-scripts", "export_glb.py"),
                "--",
                fileName,
            ]);

            exportProcess.stdout.on("data", (data) => {
                console.log(`Blender Export Output: ${data}`);
            });

            exportProcess.stderr.on("data", (data) => {
                console.error(`Blender Export Error: ${data}`);
            });

            exportProcess.on("close", (code) => {
                if (code === 0) {
                    res.status(200).sendFile(
                        path.join(__dirname, "uploads", `${fileName}.glb`)
                    );
                } else {
                    res.status(500).send("Failed to export as GLB");
                }
            });
        } catch (e) {
            console.log("Error", e);
            res.status(500).send("Failed to export as .fbx");
        }
    }
);

app.post(
    "/export/fbx",
    // authenticate,
    (req, res) => {
        const { fileName } = req.body;

        try {
            // Call the Blender script to export as GLB
            const exportProcess = spawn("blender", [
                "--background",
                "--python",
                path.join(__dirname, "blender-scripts", "export_fbx.py"),
                "--",
                fileName,
            ]);

            exportProcess.stdout.on("data", (data) => {
                console.log(`Blender Export to .fbx Output: ${data}`);
            });

            exportProcess.stderr.on("data", (data) => {
                console.error(`Blender Export to .fbx Error: ${data}`);
            });

            exportProcess.on("close", (code) => {
                console.log("Close", code);
                if (code === 0) {
                    res.status(200).sendFile(
                        path.join(__dirname, "uploads", `${fileName}.glb`)
                    );
                } else {
                    res.status(500).send("Failed to export as .fbx");
                }
            });
        } catch (e) {
            console.log("Error", e);
            res.status(500).send("Failed to export as .fbx");
        }
    }
);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
