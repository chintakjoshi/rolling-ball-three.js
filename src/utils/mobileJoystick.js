export let joystickInput = { x: 0, y: 0 };

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