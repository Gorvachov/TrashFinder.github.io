function aplicarTemaGuardado() {
    const dark = localStorage.getItem("darkMode");

    if (dark === "true") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    actualizarIconos();
}

function actualizarIconos() {
    document.querySelectorAll(".icon-mode").forEach(icon => {
        const light = icon.dataset.light;
        const dark = icon.dataset.dark;

        if (!light || !dark) return;

        icon.src = document.body.classList.contains("dark-mode") ? dark : light;
    });
}

// Activar automáticamente al cargar cualquier página
document.addEventListener("DOMContentLoaded", () => {
    aplicarTemaGuardado();

    // Si existe un switch de modo oscuro en la página
    const toggle = document.getElementById("darkModeToggle");

    if (toggle) {
        const isDark = document.body.classList.contains("dark-mode");
        toggle.checked = isDark;

        toggle.addEventListener("change", () => {
            const activo = toggle.checked;
            document.body.classList.toggle("dark-mode", activo);
            localStorage.setItem("darkMode", activo);
            actualizarIconos();
        });
    }
});
