import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
    bin_garbage,
    blue_garbage_bag,
    garbage_bag,
    garbage_bin_1
} from "./modelPositions.js";

let assetsToLoad = 0;
let assetsLoaded = 0;

function checkAllAssetsLoaded() {
    if (assetsLoaded >= assetsToLoad) {
        const overlay = document.getElementById("loadingOverlay");
        overlay.classList.add("fade-out");
        setTimeout(() => {
            overlay.style.display = "none";
            const canvas = document.getElementById("canvas");
            canvas.style.display = "block";
            requestAnimationFrame(() => {
                canvas.style.opacity = "1";
            });
        }, 1000);
    }
}

export async function loadAllModels(scene) {
    const loaders = [
        { path: "models/blue_garbage_bag/", positions: bin_garbage, scale: 0.03 },
        { path: "models/bin_garbage/", positions: blue_garbage_bag, scale: 2 },
        { path: "models/garbage_bag/", positions: garbage_bag, scale: 0.01 },
        { path: "models/garbage_bin/", positions: garbage_bin_1, scale: 3 },
    ];

    for (const { path, positions, scale } of loaders) {
        const loader = new GLTFLoader().setPath(path);
        for (let i = 0; i < positions.length; i++) {
            assetsToLoad++;
            loader.load("scene.gltf", (gltf) => {
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.position.copy(positions[i]);
                scene.add(gltf.scene);
                assetsLoaded++;
                checkAllAssetsLoaded();
            });
        }
    }
}

export function resetAssetCounts() {
    assetsLoaded = 0;
    assetsToLoad = 0;
}