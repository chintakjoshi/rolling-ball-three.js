export function applyMovement(input, angularVelocity, delta) {
    const speedFactor = 2;

    if (input.keys.has("ArrowUp")) {
        angularVelocity.x -= delta * speedFactor;
    }
    if (input.keys.has("ArrowDown")) {
        angularVelocity.x += delta * speedFactor;
    }
    if (input.keys.has("ArrowLeft")) {
        angularVelocity.z += delta * speedFactor;
    }
    if (input.keys.has("ArrowRight")) {
        angularVelocity.z -= delta * speedFactor;
    }
}

export function enforceBounds(sphere, angularVelocity) {
    const maxX = 95.5 / 2;
    const minX = -maxX;
    const maxZ = 96.5 / 2;
    const minZ = -maxZ;

    if (sphere.position.x <= minX || sphere.position.x >= maxX) {
        angularVelocity.z = 0;
    }
    if (sphere.position.z <= minZ || sphere.position.z >= maxZ) {
        angularVelocity.x = 0;
    }
}