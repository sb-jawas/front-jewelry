import { asyncApiRequest } from "../utils/funcs.js";
import { domain } from "../utils/funcs.js";

document.getElementById('aceptar').addEventListener('click', function() {
    console.log('Botón aceptar presionado');

    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value; // Asegúrate de que el ID sea 'pass'

    let bodyContent = JSON.stringify({
        email: email,
        password: password, // Cambiado de 'pass' a 'password'
    });

    let url = domain + "/api/login"; // Cambiado de '/api/users' a '/api/login'
    asyncApiRequest("post", url, bodyContent).then(function(resRegister){
        console.log(resRegister);
        
        let usuario = resRegister;

      
    });

    console.log("HOLA");
});
