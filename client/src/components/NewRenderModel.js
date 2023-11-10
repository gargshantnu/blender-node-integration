import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

const FbxLoader = ({ editProperties }) => {
    let camera, scene, renderer, stats;

    window.shantnu ? window.shantnu.push(1) : (window.shantnu = [1]);
    console.log("fbx loader", new Date().getTime());

    const [isPlaying, setIsPlaying] = useState(true);

    function togglePlayPause() {
        console.log("is playing", isPlaying, !isPlaying);
        setIsPlaying(!isPlaying);
    }
    const clock = new THREE.Clock();

    let mixer;

    function init() {
        console.log("init animations");
        const container = document.createElement("div");
        document.body.appendChild(container);

        // const playPauseButton = document.createElement("button");
        // playPauseButton.textContent = "Play/Pause";
        // playPauseButton.addEventListener("click", togglePlayPause);
        // document.body.appendChild(playPauseButton);

        camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        camera.position.set(100, 200, 300);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0);
        scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
        hemiLight.position.set(0, 200, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 5);
        dirLight.position.set(0, 200, 100);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 180;
        dirLight.shadow.camera.bottom = -100;
        dirLight.shadow.camera.left = -120;
        dirLight.shadow.camera.right = 120;
        scene.add(dirLight);
        // ground
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2000, 2000),
            new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        );
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);

        const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        // model
        const loader = new FBXLoader();
        // samba_dancing
        // stanford-bunny
        // nurbs
        loader.load("samba_dancing.fbx", function (object) {
            mixer = new THREE.AnimationMixer(object);

            const action = mixer.clipAction(object.animations[0]);
            action.play();

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(object);
        });

        renderer = new THREE.WebGLRenderer({ antialias: true });

        window.renderer = renderer;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 100, 0);
        controls.update();

        window.addEventListener("resize", onWindowResize);

        // stats
        stats = new Stats();
        // container.appendChild(stats.dom);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // const animate = useRef(() => {});
    const animate = () => {
        console.log("isPlaying in animate ", isPlaying);
        if (!isPlaying) return;
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        if (mixer) mixer.update(delta);

        renderer.render(scene, camera);

        stats.update();
    };
    // useEffect(() => {
    //   animate.current = () => {
    //     if (!isPlaying) return;
    //     requestAnimationFrame(animate.current);

    //     const delta = clock.getDelta();

    //     if (mixer) mixer.update(delta);

    //     renderer.render(scene, camera);

    //     stats.update();
    //   };
    // }, [isPlaying]);

    const isLoadedRef = useRef(false);

    useEffect(() => {
        // const { file, scale, position } = editProperties;
        // if (!file) return;
        if (!isLoadedRef.current) {
            init();
            // animate.current();
            animate();
            isLoadedRef.current = true;
        }
    }, []);
    return (
        <div className="App">
            Hello
            <button onClick={togglePlayPause}>Play/Pause</button>
        </div>
    );
};

export default FbxLoader;
