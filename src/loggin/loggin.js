import { asyncApiRequest } from "../utils/funcs.js";
import { domain } from "../utils/funcs.js";

document.getElementById('aceptar').addEventListener('click', function() {
    console.log('Botón aceptar presionado');

    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value; 

    let bodyContent = JSON.stringify({
        email: email,
        password: password, 
    });

    let url = domain + "/api/login"; 
    asyncApiRequest("post", url, bodyContent).then(function(resRegister){
        console.log(resRegister);
        sessionStorage.setItem("token",resRegister.token )

        
        console.log("sessionStorage.getItem()");
        if (resRegister.token) {
            console.log("llego")
            window.location.href = '../selection-rol/index.html';
        }else{
            alert("No se ha podido iniciar sesion");
        }
        console.log(sessionStorage.getItem("token"));

        

    });
    console.log("ADIOS");
});