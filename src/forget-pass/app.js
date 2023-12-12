import { asyncUser } from "../http/user.js"
import { domain, patternMail, sendNotification } from "../utils/funcs.js"

let newPass = document.getElementById('btnPass')
let email = document.getElementById('email')

newPass.addEventListener('click', function(){

    if(patternMail.test(email.value)){
        let url = domain + '/api/forget-pass'
        let bodyContent = JSON.stringify({
            'email' : email.value
        })
        
        asyncUser('POST', url, bodyContent).then(function(data){
            console.log(data)
            sendNotification('Si este correo está registrado, le enviaremos un correo con la nueva contraseña.','alert alert-success')
        })
    }else{
        sendNotification('No es un correo válido, por favor, introduzca un correo válido.', 'alert alert-danger')
    }
})