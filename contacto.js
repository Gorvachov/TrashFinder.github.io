// Character Counter for Textarea
const mensajeTextarea = document.getElementById('mensaje');
const charCount = document.getElementById('charCount');

mensajeTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount.textContent = currentLength;
    
    // Limitar a 500 caracteres
    if (currentLength > 500) {
        this.value = this.value.substring(0, 500);
        charCount.textContent = 500;
    }
    
    // Cambiar color si se acerca al límite
    if (currentLength > 450) {
        charCount.style.color = '#FF8C42';
    } else {
        charCount.style.color = '#666';
    }
});

// Form Validation and Submit
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        asunto: document.getElementById('asunto').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('⚠️ Por favor, ingresa un correo electrónico válido');
        return;
    }
    
    // Validate message length
    if (formData.mensaje.length < 10) {
        alert('⚠️ El mensaje debe tener al menos 10 caracteres');
        return;
    }
    
    // Simulate form submission
    console.log('📧 Datos del formulario:', formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Enviando...</span> <span class="btn-icon">⏳</span>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form
        contactForm.style.display = 'none';
        
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            charCount.textContent = '0';
            contactForm.style.display = 'block';
            successMessage.classList.remove('show');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 4000);
        
    }, 1500);
});

// Input Animation Effects
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'all 0.3s';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
    
    // Add filled class when input has value
    input.addEventListener('input', function() {
        if (this.value !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
});

// Smooth scroll animation
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle-decoration');
    
    circles.forEach((circle, index) => {
        const speed = 0.3 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Phone number formatting
const telefonoInput = document.getElementById('telefono');

telefonoInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 0) {
        // Format: +51 999 999 999
        if (value.startsWith('51')) {
            value = value.substring(2);
        }
        
        if (value.length <= 3) {
            e.target.value = '+51 ' + value;
        } else if (value.length <= 6) {
            e.target.value = '+51 ' + value.substring(0, 3) + ' ' + value.substring(3);
        } else {
            e.target.value = '+51 ' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 9);
        }
    }
});

// Add ripple effect to submit button
const submitBtn = contactForm.querySelector('.btn-submit');

submitBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .btn-submit {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    input.filled,
    select.filled,
    textarea.filled {
        border-color: var(--green-primary);
    }
`;
document.head.appendChild(style);

// Console greeting
console.log('%c📧 Formulario de Contacto - Trash Finder', 
    'color: #7BC342; font-size: 18px; font-weight: bold;');

console.log('%c¡Gracias por contactarnos!', 
    'color: #666; font-size: 14px;');

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}