import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const RenderModel = ({ editProperties }) => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    loader.load(`http://localhost:3000/uploads/${editProperties.fileName}.glb`, (gltf) => {
      const model = gltf.scene;
      model.scale.set(editProperties.scale, editProperties.scale, editProperties.scale);
      model.position.set(editProperties.position, editProperties.position, editProperties.position);

      scene.add(model);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Add any animations or updates here

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      scene.dispose();
      renderer.dispose();
    };
  }, [editProperties]);

  return <div ref={containerRef}></div>;
};

export default RenderModel;
