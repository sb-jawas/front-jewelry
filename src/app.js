import {
  sendNotification,
  setValidationBootstrap,
  patternMail, patternPass, 
  checkByPattern,
  empty, domain
} from "./utils/funcs.js";
import { asyncUser } from "./http/user.js";


let email = document.getElementById("email");
let password = document.getElementById("password");

document.getElementById("submit").addEventListener("click", () => {
    console.log(patternPass.test(password.value))

  if (empty(email.value) || !checkByPattern(patternMail, email.value)) {
    sendNotification(
      "El correo está vacío o no cumple con los requisitos para ser correo.<br>Intentalo de nuevo.",
      "alert alert-danger"
    );
    setValidationBootstrap(document.getElementById("email"), "is-invalid");
  } else if (empty(password.value) || !checkByPattern(patternPass, password.value)) {
    sendNotification(
      "La contraseña está vacía o no cumple con los requisitos para ser una contraseña.<br>Intentalo de nuevo.",
      "alert alert-danger"
    );
    setValidationBootstrap(document.getElementById("password"), "is-invalid");
  } else  {
    let bodyContent = JSON.stringify({
        "email": email.value,
        "password":password.value 
    })

    let url = domain + "/api/login"
    asyncUser("POST",url, bodyContent).then(function(data){
        if(data["token"] != undefined){
            sessionStorage.setItem("token", data["token"])
            localStorage.setItem("userId", data["user_id"])
            location.href="./selection-rol"
        }else{
            sendNotification("No ha podido iniciar sesión con esas credenciales, inténtelo de nuevo, o registrese.","alert alert-success")
        }
    })
  }
});
