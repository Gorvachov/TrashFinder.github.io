window.onload = () => {
    const campos = [
        "r-username",
        "r-nombres",
        "r-apepat",
        "r-apemat",
        "r-telefono",
        "r-email"
    ];

    campos.forEach(id => {
        const valor = localStorage.getItem(id);
        if (valor) document.getElementById(id).value = valor;
    });
};

function guardarDatos() {
    const requeridos = ["r-username", "r-nombres", "r-apepat", "r-email"];
    const mensajeError = document.getElementById("mensajeError");

    // Limpiar mensaje previo
    mensajeError.textContent = "";

    // Validar requeridos
    for (let id of requeridos) {
        if (document.getElementById(id).value.trim() === "") {
            mensajeError.textContent = "Por favor completa todos los campos obligatorios.";
            return;
        }
    }

    // Guardar todos
    [
        "r-username",
        "r-nombres",
        "r-apepat",
        "r-apemat",
        "r-telefono",
        "r-email"
    ].forEach(id => {
        localStorage.setItem(id, document.getElementById(id).value);
    });

    // Datos extra
    localStorage.setItem(
        "perfilNombre",
        `${document.getElementById("r-nombres").value} ${document.getElementById("r-apepat").value}`
    );

    localStorage.setItem("perfilEmail", document.getElementById("r-email").value);

    // Redirigir
    window.location.href = "perfil.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const dark = localStorage.getItem("darkMode");
    if (dark === "true") {
        document.body.classList.add("dark-mode");
    }
});

function volverPerfil() {
    window.location.href = "perfil.html";
}

