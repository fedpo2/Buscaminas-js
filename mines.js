/** @param {string} id*/
const $ = (id) => document.getElementById(id);

let dial = $("nombredialog");

/**@type {HTMLInputElement} name*/
let name = $("nameinput");

let errorname= $("errornameinput");

/**@param {Event} e*/
function setNombre(event){
    e.preventDefault();
    const errorname= $("errornameinput");
    if ($("nameinput").value.length < 3){
        errorname.removeAttribute("hidden");
        $("nombredialog").removeAttribute("open");
        return;
    }
    errorname.setAttribute("hidden", "");
}

function checkNombre(){
    const errorname= $("errornameinput");
    if ( $("nameinput").value.length < 3){
        errorname.remoqveAttribute("hidden");
        return;
    }
    errorname.setAttribute("hidden", "");
}

document.addEventListener("input", checkNombre());
