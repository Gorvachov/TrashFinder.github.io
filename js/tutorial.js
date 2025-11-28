let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const backLinks = document.querySelectorAll(".back-link");

function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    // Mostrar volver solo desde slide 2
    backLinks.forEach(link => {
        link.style.display = index === 0 ? "none" : "block";
    });

    // Sólo mostrar omitir en el primer slide
    if (index === 0) {
        skipBtn.classList.remove("hide");
        nextBtn.classList.remove("full-width");
        nextBtn.textContent = "Siguiente";
    }

    // Del slide 2 al 5
    if (index > 0 && index < slides.length - 1) {
        skipBtn.classList.add("hide");
        nextBtn.classList.add("full-width");
        nextBtn.textContent = "Siguiente";
    }

    // Último slide
    if (index === slides.length - 1) {
        skipBtn.classList.add("hide");
        nextBtn.classList.add("full-width");
        nextBtn.textContent = "Empezar ahora";
    }
}

// Avanzar
nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    } else {
        window.location.href = "dashboard.html";
    }
});

// Omitir
skipBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

// Retroceder
backLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
});

// Inicial
showSlide(currentSlide);
