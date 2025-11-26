window.onload = () => {
    // Datos de perfil guardados
    const n = localStorage.getItem("perfilNombre");
    const e = localStorage.getItem("perfilEmail");
    const dark = localStorage.getItem("darkMode");

    // Datos de sesión principal (como tu dashboard)
    const users = JSON.parse(localStorage.getItem("tf_users") || "[]");
    const sessionEmail = localStorage.getItem("tf_session");
    const me = users.find(u => u.email === sessionEmail);

    // Prioridad: datos de sesión > datos de perfil
    const nombreFinal = (me?.nombres || me?.username || n || "Usuario");
    const emailFinal  = (me?.email || e || "correo@no-registrado.com");

    // Pintar en el HTML
    const nameEl  = document.querySelector(".user-name");
    const emailEl = document.querySelector(".user-email");

    if (nameEl)  nameEl.textContent  = nombreFinal;
    if (emailEl) emailEl.textContent = emailFinal;

    // Aplicar modo oscuro guardado
    if (dark === "true") {
        document.body.classList.add("dark-mode");
        const toggle = document.getElementById("darkModeToggle");
        if (toggle) toggle.checked = true;
    }

    actualizarIconos();
};

// ===== Modo oscuro =====
const toggle = document.getElementById("darkModeToggle");

function actualizarIconos() {
    document.querySelectorAll(".icon-mode").forEach(icon => {
        const light = icon.dataset.light;
        const dark = icon.dataset.dark;
        icon.src = document.body.classList.contains("dark-mode") ? dark : light;
    });
}

toggle?.addEventListener("change", () => {
    const isDark = toggle.checked;
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("darkMode", isDark);
    actualizarIconos();
});

// ===== Cerrar sesión =====
function cerrarSesion() {

    // borrar sesión real
    localStorage.removeItem("tf_session");

    // opcional: redireccionar
    window.location.href = "login.html";
}


