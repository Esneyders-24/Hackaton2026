
document.getElementById("registroForm").addEventListener("submit", function(event){

    event.preventDefault();

    let nombres = document.getElementById("NyA").value;
    let dni = document.getElementById("DNI").value;
    let correo = document.getElementById("correoelectronico").value;
    let celular = document.getElementById("NumeroCelular").value;
    let contrasena = document.getElementById("contrasena").value;
   
    

 
    console.log("Nombre:", nombres);
    console.log("DNI:", dni);
    console.log("Correo:", correo);
    console.log("Celular:", celular);
    console.log("Contraseña:", contrasena);


    fetch("http://localhost/hackaton1/Registro.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
            `Nombres_y_Apellidos=${encodeURIComponent(nombres)}`
            + `&DNI=${encodeURIComponent(dni)}`
            + `&Correo=${encodeURIComponent(correo)}`
            + `&Celular=${encodeURIComponent(celular)}`
            + `&Contrasena=${encodeURIComponent(contrasena)}`
    })
    .then(response => response.json())
    .then(data => {

         if(data.success){

        Swal.fire({
            icon: 'success',
            title: '¡Registro Exitoso!',
            text: 'Su cuenta ha sido creada correctamente.',
            confirmButtonText: 'Ir al inicio de sesión'
        }).then(() => {

            window.location.href = "index.html";

        });

    }else{

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el usuario.'
        });

    }

    })
    .catch(error => {
        console.error(error);
    });

});

//Los ojos 
let ojo = document.getElementById("ojo");
let inputContrasena = document.getElementById("contrasena");

ojo.addEventListener("click", function(){

    if(inputContrasena.type === "password"){
        inputContrasena.type = "text";
        ojo.classList.remove("fa-eye");
        ojo.classList.add("fa-eye-slash");
    }
    else{
        inputContrasena.type = "password";
        ojo.classList.remove("fa-eye-slash");
        ojo.classList.add("fa-eye");
    }

});