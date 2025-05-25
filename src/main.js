import { initScene } from "./core/initScene.js";
import { gameLoop } from "./core/loop.js";
import { resetGame } from "./core/resetGame.js";
import { initMobileJoystick } from "./utils/mobileJoystick.js";

window.init = initScene;
window.loop = gameLoop;
window.resetGame = resetGame;
window.addEventListener("DOMContentLoaded", () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        initMobileJoystick();
    }
});