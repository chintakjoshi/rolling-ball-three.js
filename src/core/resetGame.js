import { scene, renderer } from "./initScene.js";
import { initScene } from "./initScene.js";
import { resetCollectedCount, setGameRunning } from "./loop.js";
import { resetAssetCounts } from "../loaders/loadModels.js";
import { updateCounterDisplay } from "../utils/counterDisplay.js";

export async function resetGame() {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    if (renderer && renderer.domElement) {
        renderer.domElement.remove();
    }

    resetCollectedCount();
    setGameRunning(true);
    resetAssetCounts();
    updateCounterDisplay();

    await initScene();

    const canvas = document.getElementById("canvas");
    canvas.style.display = "block";
    canvas.style.opacity = "1";
}