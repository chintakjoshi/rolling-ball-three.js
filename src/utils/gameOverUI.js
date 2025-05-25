export function showGameOver() {
    const overlay = document.getElementById("gameOverOverlay");
    if (overlay) {
        overlay.style.display = "block";
        const playAgain = document.getElementById("playAgainButton");
        playAgain.onclick = async () => {
            await window.resetGame();
            overlay.style.display = "none";
        };
    }
}