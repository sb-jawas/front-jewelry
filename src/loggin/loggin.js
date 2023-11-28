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
        
        let usuario = resRegister;

        console.log("HOLA");
    });

    console.log("HOLA");
});
