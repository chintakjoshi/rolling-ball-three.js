import * as THREE from "three";
import { setupLights } from "../objects/lights.js";
import { createGround } from "../objects/ground.js";
import { createSphere } from "../objects/sphere.js";
import { loadAllModels, resetAssetCounts } from "../loaders/loadModels.js";
import { updateCounterDisplay } from "../utils/counterDisplay.js";

export let scene, camera, renderer;

export async function initScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement);

    setupLights(scene);
    createGround(scene);
    createSphere(scene);

    resetAssetCounts();
    await loadAllModels(scene);

    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);
}