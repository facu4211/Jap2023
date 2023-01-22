//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function datosRegistro() {
    let datos = {
        nombre: document.getElementById("recipient-name").value,
        apellido: document.getElementById("recipient-lastname").value,
        edad: document.getElementById("recipient-edad").value,
        email: document.getElementById("recipient-email").value,
        cel: document.getElementById("recipient-telefono").value
    
    }

    localStorage.setItem("perfil", JSON.stringify(datos));
}

function getProfile() {
    let datosLocal = JSON.parse(localStorage.getItem("perfil"));
    document.getElementById("mostrarNombre").innerHTML = JSON.stringify(datosLocal.nombre)
    document.getElementById("mostrarApellido").innerHTML = JSON.stringify(datosLocal.apellido)
    document.getElementById("mostrarEdad").innerHTML = JSON.stringify(datosLocal.edad)
    document.getElementById("mostrarEmail").innerHTML = JSON.stringify(datosLocal.email)
    document.getElementById("mostrarTelefono").innerHTML = JSON.stringify(datosLocal.cel)
}


document.addEventListener("DOMContentLoaded", function (e) {
    getProfile()
});
