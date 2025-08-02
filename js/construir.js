function crearBarraSuperior() {
    var barraSuperior = document.createElement('div');
    barraSuperior.className = 'barra-superior';

    // Crear el marcador de bombas
    var marcadorBombas = document.createElement('div');
    marcadorBombas.className = 'marcador';

    var pBombas = document.createElement('p');
    pBombas.id = 'bombas';
    pBombas.textContent = '000';

    marcadorBombas.appendChild(pBombas);

    // Crear el contenedor del botón
    var divBoton = document.createElement('div');

    var boton = document.createElement('button');
    boton.id = 'botonmodo';
    boton.className = 'botonmodo';
    boton.textContent = '☺️';
    boton.onclick = hacertablero;

    divBoton.appendChild(boton);

    var marcadorTiempo = document.createElement('div');
    marcadorTiempo.className = 'marcador';

    var pTiempo = document.createElement('p');
    pTiempo.id = 'tiempo';
    pTiempo.textContent = '000';

    marcadorTiempo.appendChild(pTiempo);

    barraSuperior.appendChild(marcadorBombas);
    barraSuperior.appendChild(divBoton);
    barraSuperior.appendChild(marcadorTiempo);

    return barraSuperior;
}


function crearDialog() {
    var dialogo = document.createElement('dialog');
    dialogo.id = 'nombredialog';
    dialogo.className = 'dialogo';
    dialogo.open = true;

    var formulario = document.createElement('form');
    formulario.onsubmit = submitForm;

    var inputNombre = document.createElement('input');
    inputNombre.id = 'nameinput';
    inputNombre.name = 'name';
    inputNombre.type = 'text';
    inputNombre.value = '';
    inputNombre.minLength = 3;
    inputNombre.className = 'inputnombre';

    var etiquetaNombre = document.createElement('label');
    etiquetaNombre.htmlFor = 'name';
    etiquetaNombre.className = 'padding-etiqueta';
    etiquetaNombre.textContent = 'Ingrese su nombre';

    var spanErrorNombre = document.createElement('span');
    spanErrorNombre.id = 'errornameinput';
    spanErrorNombre.hidden = true;

    var hr1 = document.createElement('hr');
    hr1.className = 'separador';

    var textoError = document.createTextNode('El nombre tiene que tener como minimo 3 letras');
    spanErrorNombre.appendChild(hr1);
    spanErrorNombre.appendChild(textoError);

    var hr2 = document.createElement('hr');
    hr2.className = 'separador';

    var titulo = document.createElement('h2');
    titulo.textContent = 'Selector Dificultad';

    var selector = document.createElement('select');
    selector.id = 'dificultad';
    selector.name = 'selectordificultad';
    selector.className = 'dificultad';

    var opcionFacil = document.createElement('option');
    opcionFacil.value = 'facil';
    opcionFacil.textContent = 'Fácil: 8x8 – 10 minas';

    var opcionMedio = document.createElement('option');
    opcionMedio.value = 'medio';
    opcionMedio.textContent = 'Medio: 12x12 – 25 minas';

    var opcionDificil = document.createElement('option');
    opcionDificil.value = 'dificil';
    opcionDificil.textContent = 'Difícil: 16x16 – 40 minas';

    var opcionPersonalizado = document.createElement('option');
    opcionPersonalizado.value = 'custom';
    opcionPersonalizado.textContent = 'Custom';

    selector.appendChild(opcionFacil);
    selector.appendChild(opcionMedio);
    selector.appendChild(opcionDificil);
    selector.appendChild(opcionPersonalizado);

    var divOpcionesPersonalizadas = document.createElement('div');
    divOpcionesPersonalizadas.className = 'opciones-personalizadas';
    divOpcionesPersonalizadas.id = 'customoptions';
    divOpcionesPersonalizadas.hidden = true;

    var etiquetaAlto = document.createElement('label');
    etiquetaAlto.htmlFor = 'alto';
    etiquetaAlto.textContent = 'Alto';

    var inputAlto = document.createElement('input');
    inputAlto.id = 'alto';
    inputAlto.name = 'alto';
    inputAlto.type = 'number';
    inputAlto.step = '1';
    inputAlto.min = '1';
    inputAlto.value = '8';
    inputAlto.className = 'input-alto';

    var etiquetaAncho = document.createElement('label');
    etiquetaAncho.htmlFor = 'ancho';
    etiquetaAncho.textContent = 'Ancho';

    var inputAncho = document.createElement('input');
    inputAncho.name = 'ancho';
    inputAncho.id = 'ancho';
    inputAncho.type = 'number';
    inputAncho.min = '1';
    inputAncho.step = '1';
    inputAncho.value = '8';
    inputAncho.className = 'input-personalizado';

    var etiquetaMinas = document.createElement('label');
    etiquetaMinas.htmlFor = 'minas';
    etiquetaMinas.textContent = 'Minas';

    var inputMinas = document.createElement('input');
    inputMinas.name = 'minas';
    inputMinas.id = 'minas';
    inputMinas.type = 'number';
    inputMinas.step = '1';
    inputMinas.value = '10';
    inputMinas.className = 'input-personalizado';

    divOpcionesPersonalizadas.appendChild(etiquetaAlto);
    divOpcionesPersonalizadas.appendChild(inputAlto);
    divOpcionesPersonalizadas.appendChild(etiquetaAncho);
    divOpcionesPersonalizadas.appendChild(inputAncho);
    divOpcionesPersonalizadas.appendChild(etiquetaMinas);
    divOpcionesPersonalizadas.appendChild(inputMinas);

    var divErrorPersonalizado = document.createElement('div');
    divErrorPersonalizado.id = 'custominputerror';
    divErrorPersonalizado.className = 'separador';
    divErrorPersonalizado.hidden = true;

    var hr3 = document.createElement('hr');
    var textoErrorPersonalizado = document.createTextNode('No puede haber más minas que tiles.');
    divErrorPersonalizado.appendChild(hr3);
    divErrorPersonalizado.appendChild(textoErrorPersonalizado);

    var hr4 = document.createElement('hr');
    hr4.className = `separador`;

    var botonEnviar = document.createElement('button');
    botonEnviar.type = 'submit';
    botonEnviar.className = 'boton-iniciar';
    botonEnviar.textContent = 'Iniciar Buscaminas';

    formulario.appendChild(inputNombre);
    formulario.appendChild(etiquetaNombre);
    formulario.appendChild(spanErrorNombre);
    formulario.appendChild(hr2);
    formulario.appendChild(titulo);
    formulario.appendChild(selector);
    formulario.appendChild(divOpcionesPersonalizadas);
    formulario.appendChild(divErrorPersonalizado);
    formulario.appendChild(hr4);
    formulario.appendChild(botonEnviar);

    var hr5 = document.createElement('hr');
    hr5.className = 'separador';

    var divInferior = document.createElement('div');
    divInferior.className = 'barra-superior';

    var divIzquierdo = document.createElement('div');
    divIzquierdo.className = 'contenedor-dinamico-espaciado';

    var enlaceContacto = document.createElement('a');
    enlaceContacto.href = './Contacto.html';
    enlaceContacto.title = 'Contacto';
    enlaceContacto.target = '_blank';

    var imagenContacto = document.createElement('img');
    imagenContacto.alt = 'Contacto';
    imagenContacto.src = './img/info-circle.svg';
    enlaceContacto.appendChild(imagenContacto);

    var enlaceCodigo = document.createElement('a');
    enlaceCodigo.href = 'https://github.com/fedpo2/Buscaminas-js/';
    enlaceCodigo.target = '_blank';
    enlaceCodigo.title = 'Codigo';

    var imagenCodigo = document.createElement('img');
    imagenCodigo.alt = 'codigo';
    imagenCodigo.src = './img/code.svg';
    enlaceCodigo.appendChild(imagenCodigo);

    divIzquierdo.appendChild(enlaceContacto);
    divIzquierdo.appendChild(enlaceCodigo);

    var botonResultados = document.createElement('button');
    botonResultados.onclick = showResultados;
    botonResultados.title = 'Resultados';

    var imagenResultados = document.createElement('img');
    imagenResultados.alt = 'resultados';
    imagenResultados.src = './img/scoreboard.svg';
    botonResultados.appendChild(imagenResultados);

    var botonModo = document.createElement('button');
    botonModo.onclick = cambiarModo;

    var imagenSol = document.createElement('img');
    imagenSol.id = 'sol';
    imagenSol.alt = 'Modo Claro';
    imagenSol.src = './img/sol.svg';

    var imagenLuna = document.createElement('img');
    imagenLuna.id = 'luna';
    imagenLuna.alt = 'Modo Oscuro';
    imagenLuna.src = './img/luna.svg';

    botonModo.appendChild(imagenSol);
    botonModo.appendChild(imagenLuna);

    divInferior.appendChild(divIzquierdo);
    divInferior.appendChild(botonResultados);
    divInferior.appendChild(botonModo);

    dialogo.appendChild(formulario);
    dialogo.appendChild(hr5);
    dialogo.appendChild(divInferior);

    return dialogo;
}

function crearVictoriaDiag() {
    var dialogo = document.createElement("dialog");
    dialogo.id = "victoriadialog";
    dialogo.className = "dialogo";
    return dialogo;
}

function crearContenedorTablero() {
    var contenedor = document.createElement("div")
    contenedor.className = "tableroContenedor";

    var tablero = document.createElement("div")
    tablero.id ="tablero";

    contenedor.appendChild(tablero);
    return contenedor;
}

function crearDialogoResultados() {
    var dialogoResultados = document.createElement('dialog');
    dialogoResultados.id = 'resultadodialog';
    dialogoResultados.className = 'dialogo';

    var barraSuperior = document.createElement('div');
    barraSuperior.className = 'barra-superior';

    var botonCerrar = document.createElement('button');
    botonCerrar.onclick = closeResultadoDialog;

    var imagenCerrar = document.createElement('img');
    imagenCerrar.alt = 'Cerrar';
    imagenCerrar.src = './img/cross.svg';
    botonCerrar.appendChild(imagenCerrar);

    var textoTitulo = document.createTextNode('Resultados');

    var botonOrdenar = document.createElement('button');
    botonOrdenar.onclick = cambiarsort;

    var imagenOrdenNormal = document.createElement('img');
    imagenOrdenNormal.alt = 'Por Tiempo';
    imagenOrdenNormal.src = './img/sort-normal.svg';
    imagenOrdenNormal.id = 'sortNormal';

    var imagenOrdenFecha = document.createElement('img');
    imagenOrdenFecha.alt = 'Por Fecha';
    imagenOrdenFecha.src = './img/sort-fecha.svg';
    imagenOrdenFecha.id = 'sortFecha';
    imagenOrdenFecha.hidden = true;

    botonOrdenar.appendChild(imagenOrdenNormal);
    botonOrdenar.appendChild(imagenOrdenFecha);

    barraSuperior.appendChild(botonCerrar);
    barraSuperior.appendChild(textoTitulo);
    barraSuperior.appendChild(botonOrdenar);

    var separador = document.createElement('hr');
    separador.className = 'separador';

    var tabla = document.createElement('table');

    var encabezadoTabla = document.createElement('thead');

    var filaNombre = document.createElement('th');
    filaNombre.textContent = 'Nombre';

    var filaSegundos = document.createElement('th');
    filaSegundos.textContent = 'Segundos';

    var filaDificultad = document.createElement('th');
    filaDificultad.textContent = 'Dificultad';

    var filaFecha = document.createElement('th');
    filaFecha.textContent = 'Fecha';

    encabezadoTabla.appendChild(filaNombre);
    encabezadoTabla.appendChild(filaSegundos);
    encabezadoTabla.appendChild(filaDificultad);
    encabezadoTabla.appendChild(filaFecha);

    var cuerpoTabla = document.createElement('tbody');
    cuerpoTabla.id = 'tablebody';

    tabla.appendChild(encabezadoTabla);
    tabla.appendChild(cuerpoTabla);

    dialogoResultados.appendChild(barraSuperior);
    dialogoResultados.appendChild(separador);
    dialogoResultados.appendChild(tabla);

    return dialogoResultados;
}
