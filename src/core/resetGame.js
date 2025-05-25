import { scene, renderer } from "./initScene.js";
import { initScene } from "./initScene.js";
import { resetCollectedCount, setGameRunning } from "./loop.js";
import { resetAssetCounts } from "../loaders/loadModels.js";
import { updateCounterDisplay } from "../utils/counterDisplay.js";
import { createJoystick } from "../utils/mobileJoystick.js";

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

    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        let zone = document.getElementById("joystick-zone");
        if (!zone) {
            zone = document.createElement("div");
            zone.id = "joystick-zone";
            document.body.appendChild(zone);
        }

        setTimeout(() => {
            createJoystick();
        }, 100);
    }

    const canvas = document.getElementById("canvas");
    canvas.style.display = "block";
    canvas.style.opacity = "1";
}