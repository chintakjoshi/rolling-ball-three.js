export function showGameOver() {
    const overlay = document.getElementById("gameOverOverlay");
    if (overlay) {
        overlay.style.display = "block";

        if (window.nippleManager) {
            window.nippleManager.destroy();
            window.nippleManager = null;
        }

        const zone = document.getElementById("joystick-zone");
        if (zone) zone.remove();

        const playAgain = document.getElementById("playAgainButton");
        playAgain.onclick = async () => {
            await window.resetGame();
            overlay.style.display = "none";
        };
    }
}