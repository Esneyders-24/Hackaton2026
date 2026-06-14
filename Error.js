let dni = document.getElementById("DNI");
let errorDNI = document.getElementById("errorDNI");

dni.addEventListener("input", function() {

    if (dni.value === "") {
        errorDNI.textContent = "";
        dni.style.border = "";
    }
    else if (dni.value.length !== 8) {
        errorDNI.textContent = "El DNI debe tener 8 dígitos";
        errorDNI.style.color = "red";
        dni.style.border = "2px solid red";
    }
    else {
        errorDNI.textContent = "";
        dni.style.border = "2px solid green";
    }

});


//Error de correo electrnico
let correo = document.getElementById("correoelectronico");
let errorCorreo = document.getElementById("errorCorreo");

correo.addEventListener("input", function(){

    let expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if(correo.value.trim() === ""){
        errorCorreo.textContent = "";
    }
    else if(!expresion.test(correo.value)){
        errorCorreo.textContent = "Correo no válido";
        errorCorreo.style.color = "red";
    }
    else{
        errorCorreo.textContent = "";
    }

});


//Error de número de Celular
let celular = document.getElementById("NumeroCelular");
let errorCelular = document.getElementById("errorCelular");

celular.addEventListener("input", function() {

    if (celular.value === "") {
        errorCelular.textContent = "";
        celular.style.border = "";
    }
    else if (!/^9\d{8}$/.test(celular.value)) {
        errorCelular.textContent = "El celular debe comenzar con 9 y tener 9 dígitos";
        errorCelular.style.color = "red";
        celular.style.border = "2px solid red";
    }
    else {
        errorCelular.textContent = "";
        celular.style.border = "2px solid green";
    }

});

//Error de la contraseña
let contrasena = document.getElementById("contrasena");
let errorContrasena = document.getElementById("errorContrasena");

contrasena.addEventListener("input", function() {

    if (contrasena.value === "") {
        errorContrasena.textContent = "";
        contrasena.style.border = "";
    }
    else if (contrasena.value.length < 6) {
        errorContrasena.textContent =
        "La contraseña debe tener mínimo 6 caracteres";
        errorContrasena.style.color = "red";
        contrasena.style.border = "2px solid red";
    }
    else {
        errorContrasena.textContent = "";
        contrasena.style.border = "2px solid green";
    }

});


