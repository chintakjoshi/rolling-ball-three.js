let assetsToLoad = 0;
let assetsLoaded = 0;

export function assetStart() {
    assetsToLoad++;
}

export function assetLoaded() {
    assetsLoaded++;
}

export function checkAllAssetsLoaded() {
    if (assetsLoaded >= assetsToLoad) {
        triggerCinematicTransition();
    }
}

export function triggerCinematicTransition() {
    const overlay = document.getElementById("loadingOverlay");
    overlay.classList.add("fade-out");
    setTimeout(() => {
        overlay.style.display = "none";
        const canvas = document.getElementById("canvas");
        canvas.style.display = "block";
        requestAnimationFrame(() => (canvas.style.opacity = "1"));
    }, 1000);
}