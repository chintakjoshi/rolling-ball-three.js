export let joystickInput = {
    x: 0,
    y: 0
};

export function initMobileJoystick() {
    const joystickZone = document.createElement("div");
    joystickZone.id = "joystick-zone";
    document.body.appendChild(joystickZone);

    const manager = nipplejs.create({
        zone: joystickZone,
        mode: "static",
        position: { left: "50px", bottom: "50px" },
        color: "white",
        size: 100
    });

    manager.on("move", (evt, data) => {
        if (data.vector) {
            joystickInput.x = data.vector.x;
            joystickInput.y = data.vector.y;
        }
    });

    manager.on("end", () => {
        joystickInput.x = 0;
        joystickInput.y = 0;
    });
}