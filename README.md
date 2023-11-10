# blender-node-integration


## Project Overview

This project is divided into three main parts:

### 1. /clients/ Folder
This directory contains all the UI code, written in React. Pay attention to the `components` folder, where separate components are implemented to support different features. In particular, check out the `NewRenderModel` file, where Three.js is used for rendering 3D models in .fbx format. Note: I came across `modelviwer.js` a little later, so I haven't explored its functionality.

### 2. Samples
The `samples` directory includes a collection of 3D samples.

### 3. /server/ Folder
This directory encompasses all server-related code. A Node server is created here, along with Python scripts for various Blender functions such as exporting to GLB, FBX, and re-scaling models. The workflow involves Node creating a sub-shell process via the spawn function. Once the command is finished, the server returns appropriate results to the UI.


## How to run

First make sure you have blender, python and node is installed. Then:

### Running the Frontend

To run the frontend, follow these steps:

1. Navigate to the `client` directory:
```
cd client

```


2. Install dependencies:
```
npm i
```

3. Start the development server:
```
npm run dev
```

### Running the Frontend

To run the backend, follow these steps:

1. Navigate to the `server` directory:
```
cd server
```

2. Install dependencies:
```
npm i
```

3. Start the development server:
```
node server.js
```

## Todo
- Pause/play functionality for 3D models
- Render GLB files
- Resized files are not working properly need to check why.
