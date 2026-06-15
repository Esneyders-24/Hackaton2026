
document.getElementById("loginForm").addEventListener("submit", function(event){

    event.preventDefault();

    let dni = document.getElementById("username").value;
    let password = document.getElementById("contrasenaLogin").value;

    fetch("http://localhost/hackaton1/Login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `DNI=${dni}&Contrasena=${password}`
    })
    .then(response => response.json())
    .then(data => {

    if(data.success){

        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: data.nombre
        }).then(() => {

            

        });

    }else{

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.mensaje
        });

    }
    })
    .catch(error => {
        console.error(error);
    });

});