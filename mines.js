"use strict";

// Aviso uso comentarios de jsdoc para tener tipos de dato en el "ide"

/**
 * Me ahorra un monton de codigo y era visualmente menos ruidoso usar un arrow func
 * @param {string} id
 */
var $ = (id) => document.getElementById(id);

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

var casih = 8;
var casiw = 8;
var minas = 10;
var acum = 0;

var pantallaminas = 0;

var nombre = "";
var segundos = 0;
var timerlock = null;

/**@param {Event} e*/
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
    hacertablero();

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

function hacertablero() {
    if ($("nombredialog").open === true) return;

//un toque de cleanup
    reaload();

    /**@type {HTMLElement[]} tiles*/
    let tiles = [];

    for (let i = casih * casiw; i > 0 ;i-- ) {
        let a = document.createElement("button");
        a.id=++acum + "-btn";
        a.className = "bg-[#b2b2b2] p-1 m-1 rounded w-10 h-10 border shadow-md hover:bg-[#d1d1d1] active:bg-[#a1a1a1]";
        tiles.push(a);
    }

    const minasIndices = new Set();
    while (minasIndices.size < minas) {
        const rand = Math.floor(Math.random() * tiles.length);
        minasIndices.add(rand);
    }

    tiles.forEach((tile, index) => {
        tile.dataset.mina = minasIndices.has(index).toString();
        tile.dataset.abierta = "false";
        tile.dataset.flag = "false";
        tile.onclick = function(){
            showtile(tile, tiles);
        };
        tile.oncontextmenu = function (event) {
            flagtile(tile, event);
        };
        tile.onmousedown = function (event) {
            if (event.buttons === 3) {
            chording(tile, tiles);
            }
        };
    });

    tiles.forEach((t, i) => {
        const x = i % casiw;
        const y = Math.floor(i / casiw);
        let num = 0;

        for (let dx = -1; dx <= 1; ++dx) {
            for (let dy = -1; dy <= 1; ++dy) {
                if (dx == 0 && dy == 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < casiw && ny >= 0 && ny < casih) {
                    const vecinoIndex = ny * casiw + nx;
                    if (tiles[vecinoIndex].dataset.mina === "true") {
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



    for (var i = 0; i < tiles.length; i++) {
        tablero.appendChild(tiles[i]);
    }
}

/**@param {HTMLElement} t
 * @param {Event} e
 */
function flagtile(t, e) {
    e.preventDefault();

    if (t.dataset.abierta === "true") return;
    const fl = (t.dataset.flag === "true");
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

/**@param {HTMLElement} a
 * @param {HTMLElement[]} tiles
 */
function showtile(a, tiles){
    if (a.dataset.abierta ==="true") return;
    a.dataset.abierta = "true";

    iniciartimer();

    if (a.dataset.mina === "true") {
        tiles.filter((x) => x.dataset.mina === "true").forEach((xx) => {
            xx.innerHTML = "💣";
            xx.className = "bg-red-400 p-1 m-1 rounded w-10 h-10 border shadow-md";
        });

        $("botonmodo").innerHTML = "😭";
        tiles.forEach((x) => {
            showtile(x, tiles);
        });
        detenerTimer();

        vicc.innerHTML = `${nombre}: Perdiste la partida`;
        vicc.setAttribute("open", "");

    } else {
        const num = parseInt(a.dataset.numero);
        a.innerHTML = num > 0 ? num : "";
        a.className = "bg-blue-200 p-1 m-1 rounded w-10 h-10 border shadow-md";

        if (num === 0) fillblank(a, tiles);

        let vic = checkVictoria(tiles);
        if (vic) {
            detenerTimer();
            vicc.innerHTML = `${nombre}: gano la partida en: ${segundos}`;
            vicc.setAttribute("open", "");

            guardar({
                nombre,
                segundos,
                fecha: Date.now(),
                dificultad: obtenerDificultad()});
        }
    }

}


/**@param {HTMLElement[]} ts
 */
function checkVictoria(ts) {
    let tilesCerradas = ts.filter((tile) => tile.dataset.abierta === "false" && tile.dataset.flag === "false").length;

    if ($("botonmodo").innerHTML === "😭" ) {
        return false;
    }

    return tilesCerradas === Number(pantallaminas);
}

/**
 * Función de chording - abre todos los vecinos de un tile si el número de banderas
 * alrededor coincide con el número del tile
 * @param {HTMLElement} tile - El tile sobre el que hacer chording
 * @param {HTMLElement[]} tiles - Array de todos los tiles
 */
function chording(tile, tiles) {
    if (tile.dataset.abierta !== "true" || tile.dataset.flag === "true") return;

    var numero = parseInt(tile.dataset.numero);
    if (numero === 0) return;

    var index = -1;
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i] === tile) {
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
                var vecino = tiles[vecinoIndex];

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
            showtile(vecinosSinAbrir[j], tiles);
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
    /**@type Registro[] */
    var resultados = JSON.parse(localStorage.getItem("resultados") || []);

    resultados.push(reg);
    localStorage.setItem("resultados", JSON.stringify(resultados));
}

function iniciartimer() {
    if (timerlock !== null) return;
    timerlock = setInterval(() => {
        $("tiempo").innerHTML = String(++segundos).padStart(3, '0');
    }, 1000);
}


function detenerTimer() {
    if (timerlock !== null) {
        clearInterval(timerlock);
        timerlock = null;
    }
}

function fillblank(a, tiles){

    const idParts = a.id.split('-');
    const index = parseInt(idParts[0]) - 1;

    const x = index % casiw;
    const y = Math.floor(index / casiw);

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;

            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < casiw && ny >= 0 && ny < casih) {
                const vecinoIndex = ny * casiw + nx;
                const vecino = $((vecinoIndex + 1) + "-btn");
                if (vecino && vecino.dataset.abierta !== "true") {
                    showtile(vecino, tiles);
                }
            }
        }
    }
}

function reaload(){
    pantallaminas = minas;
    segundos = 0;
    acum = 0;
    $("botonmodo").innerHTML = "☺️";
    $("bombas").innerHTML = String(minas).padStart(3, '0');

    let tab = $("tablero");
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
    var list = JSON.parse(localStorage.getItem("resultados") || []);

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
