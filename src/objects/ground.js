import * as THREE from "three";

export function createGround(scene) {
    const texture = new THREE.TextureLoader().load("assets/file.jpg");
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(10, 10);

    const material = new THREE.MeshPhongMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(100, 100);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;

    scene.add(mesh);
}