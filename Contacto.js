document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggleFormBtn');
    const formContainer = document.getElementById('formContainer');
    const contactForm = document.getElementById('contactForm');
    const clickSound = document.getElementById('clickSound');

    // Mostrar/Ocultar el formulario
    toggleBtn.addEventListener('click', function () {
        formContainer.style.display = (formContainer.style.display === 'none') ? 'block' : 'none';
    });

    // Validación y apertura de mailto
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // ← Esto previene el envío real

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const nameValid = /^[a-zA-Z0-9\s]+$/.test(name);
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const messageValid = message.length > 5;

        if (!nameValid) {
            alert('El nombre debe ser alfanumérico.');
            return;
        }
        if (!emailValid) {
            alert('El correo no es válido.');
            return;
        }
        if (!messageValid) {
            alert('El mensaje debe tener más de 5 caracteres.');
            return;
        }

        const to = [
            "FedericoNicolas.Polidoro@alumnos.uai.edu.ar",
            "LucaTomas.Troiano@alumnos.uai.edu.ar"
        ];
        const subject = encodeURIComponent(`Contacto de ${name}`);
        const body = encodeURIComponent(
            `${message}\n\nCorreo del remitente: ${email}`
        );

        const mailtoLink = `mailto:${to.join(",")}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    });

    // Sonido de clic
    document.addEventListener('click', function () {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});
