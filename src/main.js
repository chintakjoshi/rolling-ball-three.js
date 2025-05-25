import { initScene } from "./core/initScene.js";
import { gameLoop } from "./core/loop.js";
import { resetGame } from "./core/resetGame.js";
import { bindJoystickEvents } from "./utils/mobileJoystick.js";

window.init = async () => {
  await initScene();

  const check = setInterval(() => {
    if (window.__joystickReady) {
      clearInterval(check);
      bindJoystickEvents();
    }
  }, 100);
};

window.loop = gameLoop;
window.resetGame = resetGame;