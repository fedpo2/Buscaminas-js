"use strict";

// Aviso uso comentarios de jsdoc para tener tipos de dato en el "ide"

/**
 * @param {string} id
 */
var $ = function(id){
    return document.getElementById(id);
}

// Esto llama funciones del construir.js (lo queria llamar build.js pero no sabia si contaba como tener nombres en
// ingles)
document.body.appendChild(crearBarraSuperior());
document.body.appendChild(crearDialog());
document.body.appendChild(crearVictoriaDiag());
document.body.appendChild(crearContenedorTablero());
document.body.appendChild(crearDialogoResultados());


var vicc = $("victoriadialog");
var nameinput = $("nameinput");
var errorname = $("errornameinput");
var dificultad = $("dificultad");
var tablero = $("tablero");
var customoptions = $("customoptions");
var inputAlto = $("alto");
var inputAncho = $("ancho");
var inputMinas = $("minas");
var nombredialog = $("nombredialog");
var errorCustomInput = $("custominputerror");
var resultadoDialog = $("resultadodialog");
var tableBody = $("tablebody");
var sortImgNormal = $("sortNormal");
var sortImgFecha = $("sortFecha");
var sol = $("sol");
var luna = $("luna");

var casih = 8;
var casiw = 8;
var minas = 10;
var acum = 0;
var guardado = false;

var pantallaminas = 0;

var nombre = "";
var segundos = 0;
var timerlock = null;

/**@param {Event} event*/
function submitForm(event) {
    event.preventDefault();
    if (nameinput.value.length < 3) {
        errorname.removeAttribute("hidden");
        return;
    }
    errorname.setAttribute("hidden", "");

    var total = inputAlto.value * inputAncho.value;

    if (total <= inputMinas.value) {
        errorCustomInput.removeAttribute("hidden");
        return;
    } else {
        errorCustomInput.setAttribute("hidden", "");
    }

    nombredialog.removeAttribute("open");

    nombre = nameinput.value;
    setDificultad();
    hacertablerofalso();

}

function checkNombre() {
    if (nameinput.value.length < 3) {
        errorname.removeAttribute("hidden");
        return;
    }
    errorname.setAttribute("hidden", "");
}

document.addEventListener("input", function ch() {
    checkNombre();
    showCustomOptions();
    checkCustomInputs();
});

function showCustomOptions() {
    if (dificultad.value === "custom") {
        customoptions.removeAttribute("hidden");
    } else {
        customoptions.setAttribute("hidden", "");
    }
}
showCustomOptions();

function checkCustomInputs() {
    var total = inputAlto.value * inputAncho.value;

    if (total <= inputMinas.value) {
        errorCustomInput.removeAttribute("hidden");
    } else {
        errorCustomInput.setAttribute("hidden", "");
    }
}
checkCustomInputs();

function setDificultad() {
    switch (dificultad.value) {
    case "facil":
        casih = 8;
        casiw = 8;
        minas = 10;
        break;

    case "medio":
        casih = 12;
        casiw = 12;
        minas = 25;
        break;

    case "dificil":
        casih = 16;
        casiw = 16;
        minas = 40;
        break;

    case "custom":
        casih = inputAlto.value;
        casiw = inputAncho.value;
        minas = inputMinas.value;
        break;

    }
}

function ponerTema(){
    var tema = localStorage.getItem("tema")||"claro";
    if (tema === "oscuro"){
        document.body.setAttribute("dark", "");
        sol.toggleAttribute("hidden");
        return;
    }

    luna.toggleAttribute("hidden");
}
ponerTema();

function cambiarModo() {
    sol.toggleAttribute("hidden");
    luna.toggleAttribute("hidden");
    document.body.toggleAttribute("dark");
    localStorage.setItem("tema", localStorage.getItem("tema")==="oscuro"?"claro":"oscuro");

}

function hacertablerofalso() {
    if ($("nombredialog").open === true) return;
    limpiarVariables();

    /**@type {HTMLElement[]} tiles*/
    var tiles = [];

    for (var i = casih * casiw; i > 0; i--) {
        var a = document.createElement("button");
        a.id = ++acum + "-btn";
        a.className = "tile";

        a.onclick = function () {
            var indice = parseInt(this.id) - 1;
            tablero.innerHTML = "";
            hacertablero(indice);
            $(this.id).click();
        };

        tiles.push(a);
    }

    tablero.style.marginTop = "1rem";
    tablero.style.display = "grid";
    tablero.style.gridTemplateColumns = `repeat(${casiw}, minmax(0,1fr))`;

    for (var i = 0; i < tiles.length; i++) {
        tablero.appendChild(tiles[i]);
    }
}

function hacertablero(celdaApretada) {
    if ($("nombredialog").open === true) return;

//un toque de cleanup
    limpiarVariables();

    /**@type {HTMLElement[]} tiles*/
    var celdas = [];

    for (var i = casih * casiw; i > 0 ;i-- ) {
        var a = document.createElement("button");
        a.id=++acum + "-btn";
        a.className = "celda";
        celdas.push(a);
    }

    var minasIndices = new Set();
    while (minasIndices.size < minas) {
        var rand = Math.floor(Math.random() * celdas.length);
        if (celdaApretada !== undefined && rand === celdaApretada) continue;
        minasIndices.add(rand);
    }

    celdas.forEach(function (celda, index) {
        celda.dataset.mina = minasIndices.has(index).toString();
        celda.dataset.abierta = "false";
        celda.dataset.flag = "false";
        celda.onclick = function(){
            showcelda(celda, celdas);
        };
        celda.oncontextmenu = function (event) {
            flagcelda(celda, event);
        };
        celda.onmousedown = function (event) {
            if (event.buttons === 3) {
            chording(celda, celdas);
            }
        };
    });

    celdas.forEach(function(t, i) {
        var x = i % casiw;
        var y = Math.floor(i / casiw);
        var num = 0;

        for (var dx = -1; dx <= 1; ++dx) {
            for (var dy = -1; dy <= 1; ++dy) {
                if (dx == 0 && dy == 0) continue;
                var nx = x + dx;
                var ny = y + dy;
                if (nx >= 0 && nx < casiw && ny >= 0 && ny < casih) {
                    var vecinoIndex = ny * casiw + nx;
                    if (celdas[vecinoIndex].dataset.mina === "true") {
                        num++;
                    }
                }
            }
        }
        t.dataset.numero = num;
    });

    tablero.style.marginTop = "1rem";
    tablero.style.display = "grid";
    tablero.style.gridTemplateColumns= `repeat(${casiw}, minmax(0,1fr))`;

    for (var i = 0; i < celdas.length; i++) {
        tablero.appendChild(celdas[i]);
    }
}

/**@param {HTMLElement} t
 * @param {Event} e
 */
function flagcelda(t, e) {
    e.preventDefault();

    if (t.dataset.abierta === "true") return;
    var fl = (t.dataset.flag === "true");
    if (fl) {
        pantallaminas++;
        t.dataset.flag = "false";
        t.innerHTML = "";
    } else {
        pantallaminas--;
        t.dataset.flag = "true";
        t.innerHTML = "🚩";
    }
    $("bombas").innerHTML = String(pantallaminas).padStart(3, '0');
}

/**@param {HTMLElement} celdaElejida
 * @param {HTMLElement[]} celdas
 */
function showcelda(celdaElejida, celdas){
    if (celdaElejida.dataset.abierta ==="true") return;
    celdaElejida.dataset.abierta = "true";

    iniciartimer();

    if (celdaElejida.dataset.mina === "true") {
        celdas.filter(function(celda) {return celda.dataset.mina === "true"}).forEach(function (celdaConBomba) {
            celdaConBomba.innerHTML = "💣";
            celdaConBomba.className = "explotado";
        });

        $("botonmodo").innerHTML = "😭";
        celdas.forEach(function (celda)  {
            showcelda(celda, celdas);
        });
        detenerTimer();

        vicc.innerHTML = `${nombre}: Perdiste la partida`;
        vicc.setAttribute("open", "");

    } else {
        var num = parseInt(celdaElejida.dataset.numero);
        celdaElejida.innerHTML = num > 0 ? num : "";
        celdaElejida.className = "celda-abierta";

        if (num === 0) fillblank(celdaElejida, celdas);

        var vic = checkVictoria(celdas);
        if (vic) {
            detenerTimer();
            var btnReinicio = document.createElement("button");
            btnReinicio.textContent = "Volver al menu principal";
            btnReinicio.onclick = volver;

            vicc.innerHTML = `${nombre}: gano la partida en: ${segundos}`;
            vicc.appendChild(btnReinicio);
            vicc.setAttribute("open", "");

            guardar({
                nombre,
                segundos,
                fecha: Date.now(),
                dificultad: obtenerDificultad()});
        }
    }

}

function volver(){
    tablero.innerHTML = "";
    nombredialog.toggleAttribute("open");
    vicc.toggleAttribute("open");
}

/**@param {HTMLElement[]} ts
 */
function checkVictoria(ts) {
    var celdasCerradas = ts.filter(function (celda) {return celda.dataset.abierta === "false" && celda.dataset.flag === "false"}).length;

    if ($("botonmodo").innerHTML === "😭" ) {
        return false;
    }

    return celdasCerradas === Number(pantallaminas);
}

/**
 * Función de chording - abre todos los vecinos de un tile si el número de banderas
 * alrededor coincide con el número del tile
 * @param {HTMLElement} celda - El tile sobre el que hacer chording
 * @param {HTMLElement[]} celdas - Array de todos los
 */
function chording(celda, celdas) {
    if (celda.dataset.abierta !== "true" || celda.dataset.flag === "true") return;

    var numero = parseInt(celda.dataset.numero);
    if (numero === 0) return;

    var index = -1;
    for (var i = 0; i < celdas.length; i++) {
        if (celdas[i] === celda) {
            index = i;
            break;
        }
    }

    var x = index % casiw;
    var y = Math.floor(index / casiw);

    var banderasVecinas = 0;
    var vecinosSinAbrir = [];

    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;

            var nx = x + dx;
            var ny = y + dy;

            if (nx >= 0 && nx < casiw && ny >= 0 && ny < casih) {
                var vecinoIndex = ny * casiw + nx;
                var vecino = celdas[vecinoIndex];

                if (vecino) {
                    if (vecino.dataset.flag === "true") {
                        banderasVecinas++;
                    }
                    else if (vecino.dataset.abierta !== "true") {
                        vecinosSinAbrir.push(vecino);
                    }
                }
            }
        }
    }
    if (banderasVecinas === numero) {
        for (var j = 0; j < vecinosSinAbrir.length; j++) {
            showcelda(vecinosSinAbrir[j], celdas);
        }
    }
}

/**
 * @typedef Registro
 * @property {string} nombre
 * @property {number} segundos
 * @property {Date} fecha
 * @property {string} dificultad
 */

/**
 * @param {Registro} reg
 */
function guardar(reg) {
    if (guardado) return;
    try {
        var resultados = JSON.parse(localStorage.getItem("resultados") ?? "[]");
        resultados.push(reg);
        localStorage.setItem("resultados", JSON.stringify(resultados));
        guardado = true;
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
}
function iniciartimer() {
    if (timerlock !== null) return;
    timerlock = setInterval(function()  {
        $("tiempo").innerHTML = String(++segundos).padStart(3, '0');
    }, 1000);
}


function detenerTimer() {
    if (timerlock !== null) {
        clearInterval(timerlock);
        timerlock = null;
    }
}

function fillblank(a, celdas){

    var idParts = a.id.split('-');
    var index = parseInt(idParts[0]) - 1;

    var x = index % casiw;
    var y = Math.floor(index / casiw);

    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;

            var nx = x + dx;
            var ny = y + dy;

            if (nx >= 0 && nx < casiw && ny >= 0 && ny < casih) {
                var vecinoIndex = ny * casiw + nx;
                var vecino = $((vecinoIndex + 1) + "-btn");
                if (vecino && vecino.dataset.abierta !== "true") {
                    showcelda(vecino, celdas);
                }
            }
        }
    }
}

function limpiarVariables(){
    pantallaminas = minas;
    segundos = 0;
    acum = 0;
    guardado= false;
    $("botonmodo").innerHTML = "☺️";
    $("bombas").innerHTML = String(minas).padStart(3, '0');

    var tab = $("tablero");
    tab.innerHTML="";
    tab.removeAttribute("hidden");

    $("tiempo").innerHTML = "000";
    $("victoriadialog").removeAttribute("open");
}

function obtenerDificultad(){
    switch (dificultad.value) {
    case "facil": case "medio": case "dificil":
        return dificultad.value;

    case "custom":
        return `alto ${inputAlto.value},  Ancho: ${inputAncho.value}, Minas: ${inputMinas.value}`;
    }
}

function showResultados() {
    nombredialog.toggleAttribute("open");

    /**@type Registro[]*/
    var list = JSON.parse(localStorage.getItem("resultados") || "[]");

    list.sort(function (a,b) {
        return a.segundos - b.segundos;
    });

    for (var i = 0; i < list.length; i++) {
        var a = document.createElement("tr");

        var fecha = new Date(Number(list[i].fecha));
        var año = fecha.getFullYear();
        var mes = String(fecha.getMonth() + 1).padStart(2, '0');
        var dia = String(fecha.getDate()).padStart(2, '0');
        var horas = String(fecha.getHours()).padStart(2, '0');
        var minutos = String(fecha.getMinutes()).padStart(2, '0');
        var segundos = String(fecha.getSeconds()).padStart(2, '0');


        var tdnombre = document.createElement("td");
        tdnombre.textContent = list[i].nombre;
        tdnombre.style.paddingRight = "1rem";

        var tdsegundo = document.createElement("td");
        tdsegundo.textContent = list[i].segundos;
        tdsegundo.style.paddingRight = "1rem";

        var tddificultad = document.createElement("td");
        tddificultad.textContent = list[i].dificultad;
        tddificultad.style.paddingRight = "1rem";

        var tdfecha = document.createElement("td");
        tdfecha.textContent = `${año} -${mes} -${dia} ${horas}:${minutos}:${segundos}`;

        a.appendChild(tdnombre);
        a.appendChild(tdsegundo);
        a.appendChild(tddificultad);
        a.appendChild(tdfecha);


        tableBody.appendChild(a);
    }
    if (list.length == 0){
        var a = document.createElement("tr");

        var tdnombre = document.createElement("td");
        tdnombre.textContent = "No hay Resultados para mostrar";
        tdnombre.style.paddingRight = "1rem";

        var tdsegundo = document.createElement("td");
        tdsegundo.style.paddingRight = "1rem";

        var tddificultad = document.createElement("td");
        tddificultad.style.paddingRight = "1rem";

        var tdfecha = document.createElement("td");

        a.appendChild(tdnombre);
        a.appendChild(tdsegundo);
        a.appendChild(tddificultad);
        a.appendChild(tdfecha);


        tableBody.appendChild(a);

    }

    resultadoDialog.toggleAttribute("open");
}

function closeResultadoDialog() {
    resultadoDialog.toggleAttribute("open");
    tableBody.innerHTML = "";
    nombredialog.toggleAttribute("open");
}

function cambiarsort() {
    sortImgNormal.toggleAttribute("hidden");
    sortImgFecha.toggleAttribute("hidden");

    var b = sortImgFecha.hasAttribute("hidden");
    var celdas = Array.from(tableBody.children);

    if (b) {
        celdas.sort(function (a, b) {
            var SegundosA = a.children[1].textContent;
            var SegundosB = b.children[1].textContent;

            var Sega = Number(SegundosA);
            var Segb = Number(SegundosB);

            return Sega - Segb;
        });
    } else {
        celdas.sort(function (a, b) {
            var fechaTextoA = a.children[3].textContent;
            var fechaTextoB = b.children[3].textContent;

            var fechaA = new Date(fechaTextoA.replace(/(\d+) -(\d+) -(\d+)/, '$1-$2-$3'));
            var fechaB = new Date(fechaTextoB.replace(/(\d+) -(\d+) -(\d+)/, '$1-$2-$3'));

            return fechaB - fechaA;
        });
    }
    tableBody.innerHTML = "";
    for(var i = 0 ; i<celdas.length; i++){
        tableBody.appendChild(celdas[i]);
    }

}
