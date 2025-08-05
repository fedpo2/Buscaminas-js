document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('toggleFormBtn');
    var formContenedor = document.getElementById('formContenedor');
    var contactoForm = document.getElementById('contactoForm');
    var clickSonido = document.getElementById('clickSonido');

    toggleBtn.addEventListener('click', function () {
        formContenedor.style.display = (formContenedor.style.display === 'none') ? 'block' : 'none';
    });

    contactoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var nombre = document.getElementById('nombre').value.trim();
        var email = document.getElementById('email').value.trim();
        var mensaje = document.getElementById('mensaje').value.trim();

        var nombreValido = /^[a-zA-Z0-9\s]+$/.test(nombre);
        var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        var mensajeValido = mensaje.length > 5;

        if (!nombreValido) {
            mostrarMensaje('El nombre debe ser alfanumérico.');
            return;
        }
        if (!emailValido) {
            mostrarMensaje('El correo no es válido.');
            return;
        }
        if (!mensajeValido) {
            mostrarMensaje('El mensaje debe tener más de 5 caracteres.');
            return;
        }

        var to = [
            "FedericoNicolas.Polidoro@alumnos.uai.edu.ar",
            "LucaTomas.Troiano@alumnos.uai.edu.ar"
        ];
        var sujeto = encodeURIComponent(`Contacto de ${nombre}`);
        var cuerpo = encodeURIComponent(
            `${mensaje}\n\nCorreo del remitente: ${email}`
        );

        var mailtoLink = `mailto:${to.join(",")}?subject=${sujeto}&body=${cuerpo}`;
        window.location.href = mailtoLink;
    });

    document.addEventListener('click', function () {
        clickSonido.currentTime = 0;
        clickSonido.play();
    });
    function mostrarMensaje(texto) {
    var mensaje = document.getElementById('formMensaje');
    mensaje.textContent = texto;
    mensaje.style.display = 'block';

    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 8000);
}
});
