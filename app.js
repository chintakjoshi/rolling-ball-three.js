import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFDD0 }); // Cream color
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

function createStripedTexture() {
    const canvas = document.createElement('canvas');
    const size = 128; // Texture size
    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, size, size);
    context.fillStyle = 'red';
    const stripeWidth = 10;
    for (let i = 0; i < size; i += 2 * stripeWidth) {
        context.fillRect(i, 0, stripeWidth, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    return texture;
}

const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ map: createStripedTexture() });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 1.5;
scene.add(sphere);

const sphereRadius = 3;
const circumference = 2 * Math.PI * sphereRadius;

document.addEventListener('keydown', onDocumentKeyDown);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    let delta = 1;  // Movement distance per key press
    let rotationAngle = (delta / circumference) * 2 * Math.PI;  // Rotation per move

    switch (keyCode) {
        case 37: // left
            sphere.position.x -= delta;
            sphere.rotation.z -= rotationAngle; // Rotate to match left movement
            break;
        case 38: // up
            sphere.position.z -= delta;
            sphere.rotation.x -= rotationAngle; // Rotation for forward movement
            break;
        case 39: // right
            sphere.position.x += delta;
            sphere.rotation.z += rotationAngle; // Rotate to match right movement
            break;
        case 40: // down
            sphere.position.z += delta;
            sphere.rotation.x += rotationAngle; // Rotation for backward movement
            break;
    }
}

const objects = [];
const loader = new GLTFLoader();
let loadedObjects = 0;

function createObjects() {
    const numObjects = 5;
    const modelPaths = [
        './gltf/garbage1/scene.gltf',
        './gltf/garbage2/scene.gltf',
        './gltf/garbage3/scene.gltf',
        './gltf/garbage4/scene.gltf',
        './gltf/garbage5/scene.gltf'
    ];

    for (let i = 0; i < numObjects; i++) {
        loader.load(
            modelPaths[i],
            function (gltf) {
                const model = gltf.scene;
                model.position.set(Math.random() * 80 - 40, 2, Math.random() * 80 - 40);
                model.scale.set(0.5, 0.5, 0.5);
                scene.add(model);
                objects.push(model);

                loadedObjects++;
                if (loadedObjects === numObjects && !animationId) {
                    animate(); // Start animation after all models are loaded
                }
            },
            undefined,
            function (error) {
                console.error('An error happened while loading a GLTF model:', error);
            }
        );
    }
}
createObjects();

function checkCollisions() {
    const ballRadius = sphere.scale.x * sphere.geometry.parameters.radius; // Correct radius calculation considering scale
    const ballBoundingSphere = new THREE.Sphere(sphere.position, ballRadius);

    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];

        // Compute the bounding box for the object
        const boundingBox = new THREE.Box3().setFromObject(object);

        // Check for intersection with the sphere's bounding sphere
        if (boundingBox.intersectsSphere(ballBoundingSphere)) {
            scene.remove(object);
            objects.splice(i, 1);
            sphere.scale.multiplyScalar(1.05); // Optionally scale the sphere upon collision
        }
    }
}


function checkGameOver() {
    if (objects.length === 0 && loadedObjects === 5) { // Ensure all objects are supposed to be loaded
        gameOver('Congratulations, you\'ve collected all objects!');
    } else if (Math.abs(sphere.position.x) > 50 || Math.abs(sphere.position.z) > 50) {
        gameOver('You went out of bounds!');
    }
}

function gameOver(message) {
    cancelAnimationFrame(animationId);
    const modal = document.getElementById('gameOverModal');
    const messageElement = document.getElementById('gameOverMessage');
    messageElement.textContent = message;
    modal.style.display = 'flex'; // Show the modal
}

function restartGame() {
    cancelAnimationFrame(animationId);  // Correctly cancels the ongoing animation frame
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none'; // Properly hides the modal

    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);  // Clears the scene of all objects
    }

    scene.add(plane);
    sphere.geometry = new THREE.SphereGeometry(3, 32, 32); // Resets the sphere's geometry
    sphere.scale.set(1, 1, 1); // Correctly resets the scale
    sphere.position.set(0, 1.5, 0); // Correctly resets the position
    scene.add(sphere);
    loadedObjects = 0; // Properly resets the count of loaded objects
    objects.length = 0; // Clears the objects array without reassignment
    createObjects(); // Calls to recreate objects
}

window.restartGame = restartGame;

let animationId;

let lastRender = 0;
function animate(timestamp) {
    animationId = requestAnimationFrame(animate);
    const deltaTime = (timestamp - lastRender) / 1000;
    lastRender = timestamp;

    if (deltaTime < 0.2) { // Ensuring that the game logic doesn't update too erratically
        checkCollisions();
        checkGameOver();
    }

    camera.position.x = sphere.position.x;
    camera.position.z = sphere.position.z + 15;
    camera.position.y = sphere.position.y + 15;
    camera.lookAt(sphere.position);
    renderer.render(scene, camera);
}

animate();