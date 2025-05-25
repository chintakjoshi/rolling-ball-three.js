import * as THREE from "three";
import { scene, camera, renderer } from "./initScene.js";
import { updateCounterDisplay } from "../utils/counterDisplay.js";
import { showGameOver } from "../utils/gameOverUI.js";
import { applyMovement, enforceBounds } from "../utils/movement.js";

const v0 = new THREE.Vector3();
const q = new THREE.Quaternion();
const angularVelocity = new THREE.Vector3();
let cameraDistance = 10;
let delta = 0;
let gameRunning = true;
export let garbagebincollected = 0;

export function gameLoop(dt, canvas, input) {
    delta = Math.min(dt, 0.03);
    if (!gameRunning) return;

    const sphere = scene.getObjectByName("sphere");

    const garbagebinobjects = scene.children.filter(obj => obj.type === "Group");
    for (const garbagetin of garbagebinobjects) {
        if (
            sphere.position.distanceTo(garbagetin.position) < 2.5 &&
            !garbagetin.isAttached
        ) {
            const originalScale = garbagetin.scale.clone();
            const pickedPosition = sphere.worldToLocal(garbagetin.position.clone());
            garbagetin.position.copy(pickedPosition);
            sphere.add(garbagetin);
            garbagetin.isAttached = true;
            garbagetin.scale.copy(originalScale);
            garbagebincollected++;
            updateCounterDisplay();

            if (garbagebincollected >= 20) {
                gameRunning = false;
                showGameOver();
                break;
            }

            const currentScale = sphere.scale.x;
            sphere.scale.set(
                currentScale + 0.03,
                currentScale + 0.03,
                currentScale + 0.03
            );
        }
    }

    enforceBounds(sphere, angularVelocity);
    applyMovement(input, angularVelocity, delta);
    q.setFromAxisAngle(angularVelocity, delta).normalize();
    sphere.applyQuaternion(q);
    angularVelocity.lerp(v0, 0.01);

    sphere.position.x -= angularVelocity.z * delta;
    sphere.position.z += angularVelocity.x * delta;

    camera.position.x = sphere.position.x;
    camera.position.z = sphere.position.z + cameraDistance;
    camera.lookAt(sphere.position);

    renderer.render(scene, camera);
}

export function setGameRunning(state) {
    gameRunning = state;
}

export function resetCollectedCount() {
    garbagebincollected = 0;
}