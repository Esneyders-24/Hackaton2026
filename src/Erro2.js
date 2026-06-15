let dniLogin = document.getElementById("username");
let errorLoginDNI = document.getElementById("errorLoginDNI");

dniLogin.addEventListener("input", function() {

    if(dniLogin.value === ""){
        errorLoginDNI.textContent = "";
        dniLogin.style.border = "";
    }
    else if(dniLogin.value.length !== 8){
        errorLoginDNI.textContent = "El DNI debe tener 8 dígitos";
        errorLoginDNI.style.color = "red";
        dniLogin.style.border = "2px solid red";
    }
    else{
        errorLoginDNI.textContent = "";
        dniLogin.style.border = "2px solid green";
    }

});

//Error de constraseña login
let ojoLogin = document.getElementById("ojoLogin");
let errorLoginConstrasena = document.getElementById("contrasenaLogin");

ojoLogin.addEventListener("click", function(){

    if(errorLoginConstrasena.type === "password"){
        errorLoginConstrasena.type = "text";
        ojoLogin.classList.remove("fa-eye");
        ojoLogin.classList.add("fa-eye-slash");
    }
    else{
        errorLoginConstrasena.type = "password";
        ojoLogin.classList.remove("fa-eye-slash");
        ojoLogin.classList.add("fa-eye");
    }

});

