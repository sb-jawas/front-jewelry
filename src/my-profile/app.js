import { asyncUser } from "../http/user.js";
import {
  domain,
  sendNotification,
  setValidationBootstrap,
  patterName,
  patternMail,
  patternPass, 
  getLocalStorage,
  asyncApiRequest

} from "../utils/funcs.js";

let nameUser = document.getElementById("name");
let nameEmpresa = document.getElementById("name_empresa");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let btnSubmit = document.getElementById("btn-submit");

let url = domain+"/api/user/"+getLocalStorage("userId")
asyncApiRequest("GET", url).then(function(data){
  nameUser.setAttribute("placeholder" , data.msg.name)
  nameEmpresa.setAttribute("placeholder" , data.msg.name_empresa)
  email.setAttribute("placeholder" , data.msg.email)
})

nameUser.addEventListener("input", function (event) {
  if (patterName.test(event.target.value)) {
    setValidationBootstrap(nameUser, "is-valid");

  } else {
    setValidationBootstrap(nameUser, "is-invalid");
  }
});

nameEmpresa.addEventListener("input", function (event) {
  if (patterName.test(event.target.value)) {
    setValidationBootstrap(nameEmpresa, "is-valid");

  } else {
    setValidationBootstrap(nameEmpresa, "is-invalid");

  }
});

email.addEventListener("input", function (event) {
  if (patternMail.test(event.target.value)) {
    setValidationBootstrap(email, "is-valid");

  } else {
    setValidationBootstrap(email, "is-invalid");

  }
});

pass.addEventListener("input", function (event) {
  if (patternPass.test(event.target.value)) {
    setValidationBootstrap(pass, "is-valid");
  } else {
    setValidationBootstrap(pass, "is-invalid");
  }
});

btnSubmit.addEventListener("click", function () {      
  let inputData = document.getElementsByName("inputData")
  let arr = {}
  inputData.forEach(element =>{
    if(element.value.length>=1){
      if(myTest[element.id].test(element.value)){
        arr[`${element.id}`] = `${element.value}`
      }
    }
  })
  let bodyContent = JSON.stringify(arr)
  
  let url = domain + "/api/user/" + getLocalStorage("userId")
  asyncUser("PUT",url, bodyContent).then(function(data){
    if(typeof data == "object" ){
      sendNotification("Usuario actualizado correctamente","alert alert-success")
    }else{
      let parseData = JSON.parse(data)
      if(parseData.status == 400){
        
        let error = parseData.msg.email;
        let error2 = parseData.msg.name_empresa;
        let errors = [error, error2];
        let mess = "Errores: <ul>";
        errors.forEach((element) => {
          if (element != undefined) {
            mess += "<li>" + element + "</li>";
          }
        });
        mess += "</ul>";
        
        sendNotification(mess, "alert alert-danger");
      }
    }
  })
});

let myTest = {
  "name" : patterName,
  "name_empresa" : patterName,
  "email" : patternMail,
  "password" : patternPass,
}

