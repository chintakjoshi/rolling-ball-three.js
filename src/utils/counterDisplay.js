import { garbagebincollected } from "../core/loop.js";

const counterDisplay = document.getElementById("counterDisplay");
const totalGarbageBins = 20;

export function updateCounterDisplay() {
    counterDisplay.textContent = `(${garbagebincollected}/${totalGarbageBins})`;
}