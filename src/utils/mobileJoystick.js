export let joystickInput = { x: 0, y: 0 };

export function createJoystick() {
    const zone = document.getElementById("joystick-zone");
    if (!zone || typeof nipplejs === "undefined") return;

    window.nippleManager = nipplejs.create({
        zone: zone,
        mode: "dynamic",
        color: "white",
        size: 90,
        restOpacity: 0.6,
        fadeTime: 150
    });

    bindJoystickEvents();
}

export function bindJoystickEvents() {
    const manager = window.nippleManager;
    if (!manager) return;

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