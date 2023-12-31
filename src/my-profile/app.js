import { asyncUser, logout, uploadImage } from "../http/user.js";
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
let imgProfile = document.getElementById('imageProfile')
let newImage = document.getElementById('newFoto')
let btnSubmit = document.getElementById("btn-submit");
let btnLogout= document.getElementById("btnFullLogout");
let btnFoto = document.getElementById('btnFoto')

let url = domain+"/api/user/"+getLocalStorage("userId")
asyncApiRequest("GET", url).then(function(data){
  nameUser.setAttribute("placeholder" , data.msg.name)
  nameEmpresa.setAttribute("placeholder" , data.msg.name_empresa)
  email.setAttribute("placeholder" , data.msg.email)
  imgProfile.setAttribute("src" , data.msg.profile)
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

btnLogout.addEventListener('click',function(){

  let url = domain + '/api/full-logout/'+getLocalStorage("userId")
  logout(url).then(function(data){
    console.log(data)
  })

})

btnFoto.addEventListener('click', function(){
  let bodyImage = new FormData();
  bodyImage.append("image", newImage.files[0]);
  let url = domain + "/api/image"
console.log(bodyImage.get('image'))
  uploadImage("POST", url, bodyImage).then(function (resImage) {
    console.log(resImage);
    let bodyContent = JSON.stringify({
      profile:resImage.url
    });
    let url = domain + "/api/user/"+getLocalStorage('userId');
    asyncApiRequest("PUT", url, bodyContent)
      .then(function (data) {
        console.log(data)
        sendNotification("Foto de perfil actualizada", "alert alert-success");
      })
      .catch(function (error) {
        console.log(error);
      });
  });
})

newImage.addEventListener("change", function (event) {
  imgProfile.src = URL.createObjectURL(event.target.files[0]);
});