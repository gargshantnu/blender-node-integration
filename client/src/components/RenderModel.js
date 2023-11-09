import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { FBXLoader } from 'three-fbxloader-offical'; // Updated FBXLoader import
import { GLTFLoader } from 'three-gltf-loader';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const RenderModel = ({ editProperties }) => {
  const containerRef = useRef();

  useEffect(() => {
    const { file, scale, position } = editProperties;
    if (!file) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const loadModel = () => {
      const loader = file.name.endsWith('.fbx') ? new FBXLoader() : new GLTFLoader();

      loader.load(URL.createObjectURL(file), (model) => {
        model.scale.set(scale, scale, scale);
        model.position.set(position, position, position);

        scene.add(model);

        camera.position.z = 5;

        const animate = () => {
          requestAnimationFrame(animate);

          // Add any animations or updates here

          renderer.render(scene, camera);
        };

        animate();
      });
    };

    loadModel();

    // Cleanup on unmount
    return () => {
      // Dispose renderer
      renderer.dispose();
    };
  }, [editProperties]);

  return <div ref={containerRef}></div>;
};

export default RenderModel;
