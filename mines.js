/** @param {string} id*/
const $ = (id) => document.getElementById(id);

/**@param {Event} e*/
function setNombre(event) {
    event.preventDefault();
    const errorname = $("errornameinput");
    if ($("nameinput").value.length < 3) {
        errorname.removeAttribute("hidden");
        return;
    }
    errorname.setAttribute("hidden", "");
    $("nombredialog").removeAttribute("open");
    hacertablero();

}

function checkNombre() {
    const errorname = $("errornameinput");
    let name = $("nameinput");

    if (name.value.length < 3) {
        errorname.removeAttribute("hidden");
        return;
    }
    errorname.setAttribute("hidden", "");
}

document.addEventListener("input", () => checkNombre());

const casih = 8;
const casiw = 8;
const minas = 10;
let acum = 0;


function hacertablero() {

    if ($("nombredialog").open === true) return;

    //un toque de cleanup
    reaload();

    iniciartimer();
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
        tile.onclick = ()=>showtile(tile, tiles);
    });

    tiles.forEach((t, i)=>{
        const x = i % casiw;
        const y = Math.floor(i/casiw);
        let num =0;

        for (let dx = -1; dx<=1; ++dx){
            for(let dy = -1; dy<=1; ++dy){
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

    let tablero = $("tablero");
    tiles.forEach((x) => {
        tablero.appendChild(x);
    });
}

/**@param {HTMLElement} a
 * @param {HTMLElement[]} tiles
 */
function showtile(a, tiles){
    if (a.dataset.abierta ==="true") return;
    a.dataset.abierta = "true";

    if (a.dataset.mina === "true"){
        tiles.filter((x)=> x.dataset.mina === "true").forEach((xx)=>{
            xx.innerHTML = "💣";
            xx.className = "bg-red-400 p-1 m-1 rounded w-10 h-10 border shadow-md";
        });

        tiles.forEach((x)=>{
            showtile(x, tiles);
        });
        $("botonmodo").innerHTML = "😭";
        detenerTimer();


    } else {
        const num = parseInt(a.dataset.numero);
        a.innerHTML = num > 0 ? num : "";
        a.className = "bg-blue-200 p-1 m-1 rounded w-10 h-10 border shadow-md";

        if (num === 0) fillblank(a, tiles);
    }
}



let segundos = 0;
let timerlock = null;
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
    segundos = 0;
    $("botonmodo").innerHTML = "☺️";
    $("bombas").innerHTML = "0" + String(minas);
    $("tablero").innerHTML="";
    $("tiempo").innerHTML = "000";
}
