import { initScene } from "./core/initScene.js";
import { gameLoop } from "./core/loop.js";
import { resetGame } from "./core/resetGame.js";

window.init = initScene;
window.loop = gameLoop;
window.resetGame = resetGame;