document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('toggleFormBtn');
    var formContainer = document.getElementById('formContainer');
    var contactForm = document.getElementById('contactForm');
    var clickSound = document.getElementById('clickSound');

    toggleBtn.addEventListener('click', function () {
        formContainer.style.display = (formContainer.style.display === 'none') ? 'block' : 'none';
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var message = document.getElementById('message').value.trim();

        var nameValid = /^[a-zA-Z0-9\s]+$/.test(name);
        var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        var messageValid = message.length > 5;

        if (!nameValid) {
            mostrarMensaje('El nombre debe ser alfanumérico.');
            return;
        }
        if (!emailValid) {
            mostrarMensaje('El correo no es válido.');
            return;
        }
        if (!messageValid) {
            mostrarMensaje('El mensaje debe tener más de 5 caracteres.');
            return;
        }

        var to = [
            "FedericoNicolas.Polidoro@alumnos.uai.edu.ar",
            "LucaTomas.Troiano@alumnos.uai.edu.ar"
        ];
        var subject = encodeURIComponent(`Contacto de ${name}`);
        var body = encodeURIComponent(
            `${message}\n\nCorreo del remitente: ${email}`
        );

        var mailtoLink = `mailto:${to.join(",")}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    });

    document.addEventListener('click', function () {
        clickSound.currentTime = 0;
        clickSound.play();
    });
    function mostrarMensaje(texto) {
    var mensaje = document.getElementById('formMessage');
    mensaje.textContent = texto;
    mensaje.style.display = 'block';

    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 8000);
}
});
