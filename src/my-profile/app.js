import { asyncUser } from "../http/user.js";
import {
  domain,
  empty,
  sendNotification,
  setValidationBootstrap,
  patterName,
  patternMail,
  patternPass, 
  getLocalStorage,
  asyncApiRequest

} from "../utils/funcs.js";

let nameUser = document.getElementById("nameUser");
let nameEmpresa = document.getElementById("nameEmpresa");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let pass2 = document.getElementById("passwordConfirm");
let btnSubmit = document.getElementById("btn-submit");
let table = document.getElementById("table");

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
    setValidationBootstrap(pass2, "is-invalid");
  }
});

pass2.addEventListener("input", function (event) {
  if (patternPass.test(event.target.value) && pass.value == pass2.value) {
    setValidationBootstrap(pass2, "is-valid");
  } else {
    setValidationBootstrap(pass2, "is-invalid");
  }
});

btnSubmit.addEventListener("click", function () {
  let arrChecked = checkEmptyValues(nameUser, nameEmpresa, email, pass, pass2);
  if (arrChecked[0] < 5) {
    let arrCh = checkPatternValues(
      patterName,
      patterName,
      patternMail,
      patternPass,
      nameUser,
      nameEmpresa,
      email,
      pass,
      pass2
    );
    if (arrCh[0] < 6) {
      if (pass.value == pass2.value) {
       

        setTimeout(function () {
          table.addEventListener("input", function () {
            document.getElementById("btn-submit").removeAttribute("disabled");
          });
        }, 2000);
      } else {
        sendNotification("La contraseña no coincide", "alert alert-danger");
      }
    } else {
      sendNotification(
        listEmpty(arrCh, "Revisa los siguientes errores"),
        "alert alert-danger"
      );
    }
  } else {
    sendNotification(
      listEmpty(arrChecked, "Values Empty"),
      "alert alert-danger"
    );
    arrChecked[0].forEach((element) => {
      setValidationBootstrap(document.getElementById(element), "is-invalid");
    });
  }
});

function checkEmptyValues(nameUser, nameEmpresa, email, pass, pass2) {
  let arrValues = [nameUser, nameEmpresa, email, pass, pass2];
  let emptyValues = [];
  let notEmptyValues = [];

  let i = 0;

  while (i < arrValues.length) {
    if (!empty(arrValues[i].value)) {
      notEmptyValues.push(arrValues[i].id);
    } else {
      emptyValues.push(arrValues[i].id);
    }
    i++;
  }

  let rtnArr = [emptyValues, notEmptyValues];

  return rtnArr;
}

function checkPatternValues(
  patterName,
  patterNameEmpresa,
  patternMail,
  patternPass,
  name,
  nameEmpresa,
  email,
  pass,
  pass2
) {
  let arrPatterns = [
    patterName,
    patterNameEmpresa,
    patternMail,
    patternPass,
    patternPass,
  ];
  let arrValues = [name, nameEmpresa, email, pass, pass2];
  let rtnErrors = [
    "El nombre debe de contener entre 3 y 30 carácteres",
    "El nombre de la empresa debe de contener entre 3 y 30 carácteres",
    "El correo no cumple con los requisitos para ser un correo válido <br> ejemplo: username@foo.tld",
    "La contraseña debe tener entre 8 y 14 caracteres de longitud y puede contener los siguientes caracteres especiales: *, #, $.",
    "La contraseña debe tener entre 8 y 14 caracteres de longitud y puede contener los siguientes caracteres especiales: *, #, $.",
  ];

  let notPassedTest = [];
  let passedTest = [];
  let notPassedTestId = [];

  let i = 0;

  while (i < arrValues.length) {
    if (arrPatterns[i].test(arrValues[i].value)) {
      passedTest.push(arrValues[i].id);
    } else {
      notPassedTest.push(rtnErrors[i]);
      notPassedTestId.push(arrValues[i].id);
    }
    i++;
  }

  let rtnArr = [notPassedTest, notPassedTestId, passedTest];

  return rtnArr;
}

function listEmpty(arrList, titleErrorMsg) {
  let i = 0;
  let rtnList = titleErrorMsg + ": <ul>";
  while (i < arrList[0].length) {
    rtnList += "<li>" + arrList[0][i] + "</li>";
    i++;
  }
  rtnList += "</ul>";
  return rtnList;
}
