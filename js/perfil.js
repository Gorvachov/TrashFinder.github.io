window.onload = () => {

    // Cargar datos de sesión
    const users = JSON.parse(localStorage.getItem("tf_users") || "[]");
    const sessionEmail = localStorage.getItem("tf_session");
    const me = users.find(u => u.email === sessionEmail);

    // Construir nombre completo
    let nombreCompleto = "Usuario";
    let correo = "correo@no-registrado.com";

    if (me) {
        const nombre = me.nombres || "";
        const apellido = me.apepat || "";
        nombreCompleto = `${nombre} ${apellido}`.trim();
        correo = me.email || correo;
    }

    // Pintar datos en HTML
    const nameEl  = document.querySelector(".user-name");
    const emailEl = document.querySelector(".user-email");

    if (nameEl)  nameEl.textContent  = nombreCompleto;
    if (emailEl) emailEl.textContent = correo;

    // Aplicar modo oscuro guardado
    const dark = localStorage.getItem("darkMode");
    const toggle = document.getElementById("darkModeToggle");

    if (dark === "true") {
        document.body.classList.add("dark-mode");
        if (toggle) toggle.checked = true;
    }

    actualizarIconos();
};


// Modo oscuro + cambio de icono
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

function volverPerfil() {
    window.location.href = "dashboard.html";
}

// Cerrar sesión
function cerrarSesion() {
    alert("Sesión cerrada");

    // borrar sesión real
    localStorage.removeItem("tf_session");

    // volver a login
    window.location.href = "login.html";
}
