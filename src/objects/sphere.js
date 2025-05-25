import * as THREE from "three";

export function createSphere(scene) {
    const texture = new THREE.TextureLoader().load("assets/test.avif");
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const sphere = new THREE.Mesh(geometry, material);

    sphere.name = "sphere";
    sphere.position.y = 1;
    sphere.castShadow = true;

    scene.add(sphere);
}