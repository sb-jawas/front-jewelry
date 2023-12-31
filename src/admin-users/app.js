import { asyncUpdateUser, asyncUser, uploadImage } from "../http/user.js";
import {
  domain,
  asyncApiRequest,
  formatDate,
  sendNotification,
  redirectToMyRol,
  patterName,
  patternMail,
  patternPass,
  patternDate,
  sendNotificationModal,
  getLocalStorage,
} from "../utils/funcs.js";
import { navbar } from "../utils/navbar.js";
let rolView = 4
redirectToMyRol(rolView)
navbar(getLocalStorage("userName"),"Admin")

const table = document.getElementById("table");
let searchUser = document.getElementById("searchUser");
let countUsers = document.getElementById("countUsers");
let addUser = document.getElementById("addUser");
let buttonFooter = document.getElementById("buttons");
let bodyModal = document.getElementById("bodyModal");
let inputData = document.getElementsByName("inputData");
let userId = document.getElementById("userId");
let userImage = document.getElementById("profile");
let newImage = document.getElementById("newImage");

let checkboxRoles = document.getElementById("checkRoles");
let rolAdmin = document.getElementById("4");
let rolDesigner = document.getElementById("3");
let rolClas = document.getElementById("2");
let rolCol = document.getElementById("1");

let saveUser = document.getElementById("save");
let btnbajaUser = document.getElementById("baja");
let btnProgramBaja = document.getElementById("programBaja");
let btnActiveUser = document.getElementById("activarUser");
let changePass = document.getElementById("changePass");

let btnCreate = createBtn("Crear usuario", "btn btn-outline-success");
let btnPrg = createBtn("Programar alta", "btn btn-outline-warning");

let url = domain + "/api/admin";
let methodApi = "GET";

asyncApiRequest(methodApi, url).then(function (data) {
  if (data.length >= 1) {
    countUsers.innerText = `Se han encontrado ${data.length} usuarios.`;
    createTable(data);
  } else {
    sendNotification(
      "No hay usuarios en la base de datos.",
      "alert alert-info"
    );
  }
});

function createTable(data) {
  let arr = ["name", "email", "role"];
  let i = 0;
  let arrDatos = data;

  while (i < arrDatos.length) {
    const row = document.createElement("tr");
    row.id = data[i].id;

    let j = 0;
    while (j < arr.length) {
      const cell = document.createElement("td");
      if (j == 2) { 
        let btn = document.createElement("button");
        let deleteUser = createBtn("Eliminar usuario", "btn btn-danger m-1");

        btn.innerHTML = "Gestionar usuario";
        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#modalProfile");
        btn.setAttribute("class", "btn btn-primary m-1");
        btn.addEventListener("click", function (event) {
          let groupDate = document.getElementById("groupDate");

          if (groupDate != null) {
            groupDate.hidden = true;
            btnPrg.disabled = false;
            groupDate.style.visibility = "hidden";
          }

          btnbajaUser = document.getElementById("baja");
          btnProgramBaja = document.getElementById("programBaja");
          btnActiveUser = document.getElementById("activarUser");
          saveUser = document.getElementById("save");
          changePass = document.getElementById("changePass");
          let btns = [
            btnbajaUser,
            btnProgramBaja,
            btnActiveUser,
            saveUser,
            changePass,
            deleteUser,
          ];
          switchHiddenBtns(btns, false);
          let btn2 = [btnPrg, btnCreate];
          switchHiddenBtns(btn2, true);

          userId = event.target.parentNode.parentNode.id;
          let url = domain + "/api/user/" + userId;
          asyncApiRequest("GET", url).then(function (user) {
            document.getElementById("userName").innerHTML =
              "ID usuario: " + user.msg.id;

              if(user.msg.end_at==null){
                btnActiveUser.hidden = true
              }else{
                if(user.msg.end_at>=user.msg.start_at){
                  btnActiveUser.hidden = false
                  btnProgramBaja.hidden = true
                  btnbajaUser.hidden = true
                  debugger
                }
              }

            userImage.setAttribute("src", user.msg.profile);

            offCheckBox();

            let j = 0;
            while (j < user.msg.roles.length) {
              switch (user.msg.roles[j].id) {
                case 1:
                  rolCol.checked = true;
                  break;

                case 2:
                  rolClas.checked = true;

                  break;

                case 3:
                  rolDesigner.checked = true;

                  break;
                case 4:
                  rolAdmin.checked = true;

                  break;
              }
              
              j++;
            }

            let i = 0;
            while (i < inputData.length) {
              inputData[i].placeholder = user.msg[inputData[i].id];
              i++;
            }
          });
        });
        deleteUser.id = arrDatos[i].id;
        deleteUser.addEventListener("click", function (event) {
          let url = domain + "/api/admin/" + event.target.id;

          setAttribute("id", event.target.id);
          asyncApiRequest("DELETE", url)
            .then(function (data) {
              sendNotification("Usuario eliminado", "alert alert-success");
              setTimeout(() => {
                location.reload();
              }, 2000);
            })
            .catch(function (error) {
              sendNotification(
                "No ha sido posible eliminar este usuario",
                "alert alert-danger"
              );
            });
        });
        cell.appendChild(btn);
        cell.appendChild(deleteUser);
      } else {
        const cellText = document.createTextNode(arrDatos[i][arr[j]]);
        cell.appendChild(cellText);
      }

      row.appendChild(cell);
      j++;
    }
    document.getElementById("tbody").appendChild(row);
    i++;
  }
}

searchUser.addEventListener("input", function (event) {
  let bodyContent = JSON.stringify({
    email: event.target.value,
  });
  let url = domain + "/api/admin/search";
  asyncApiRequest("POST", url, bodyContent).then(function (data) {
    document.getElementById("tbody").remove();
    let newTbody = document.createElement("tbody");
    newTbody.setAttribute("id", "tbody");
    table.appendChild(newTbody);
    countUsers.innerText = `Se han encontrado ${data.length} usuarios.`;
    createTable(data);
  });
});

addUser.addEventListener("click", function () {
  let saveUser = document.getElementById("save");

  document.getElementById("userName").innerHTML = "Nuevo usuario";

  btnbajaUser = document.getElementById("baja");
  btnProgramBaja = document.getElementById("programBaja");

  btnActiveUser = document.getElementById("activarUser");
  buttonFooter = document.getElementById("buttons");
  changePass = document.getElementById("changePass");

  let btns = [btnbajaUser, btnProgramBaja, btnActiveUser, saveUser, changePass];
  switchHiddenBtns(btns, true);

  let btn2 = [btnPrg, btnCreate];
  switchHiddenBtns(btn2, false);

  offCheckBox();

  btnPrg.addEventListener("click", function () {
    btnPrg.disabled = true;
    let groupDate = document.getElementById("groupDate");

    if (groupDate == null) {
      let newDiv = document.createElement("div");
      newDiv.id = "groupDate";

      let label = document.createElement("label");
      label.innerText =
        "Seleccione el día en el cual se hará efectivo el acceso al sistema.";

      let labelEnd = document.createElement("label");
      labelEnd.innerText =
        "Opcional: Último que el usuario podrá acceder al sistema.";

      let starAt = createInput("start_at");
      let endAt = createInput("end_at");

      newDiv.appendChild(label);
      newDiv.appendChild(starAt);
      newDiv.appendChild(labelEnd);
      newDiv.appendChild(endAt);
      bodyModal.appendChild(newDiv);
    } else {
      groupDate.style.visibility = "visivility";
    }
  });

  btnCreate.addEventListener("click", function () {
    let arr = {};
    let bodyImage = new FormData();

    let mess = "Revisar errores en: <ul>";
    let checkTest = false;

    inputData.forEach((element) => {
      if (
        element.id != "profile" &&
        element.id != "newImage" &&
        element.type != "checkbox"
      ) {
        if (element.value.length >= 1) {
          if (element.type == "date") {
            let change = element.value.replace("-", "/").replace("-", "/");

            if (myTest[element.id].test(change)) {
              arr[element.id] = change;
            }
          }
          if (myTest[element.id].test(element.value)) {
            arr[element.id] = element.value;
          }
        } else {
          mess += "<li>" + element.alt + "</li>";
          checkTest = true;
        }
      }
      if (element.type == "file" && element.files.length >= 1) {
        console.log(element.files);
        bodyImage.append("image", element.files[0]);
      }
    });

    if (checkTest) {
      sendNotificationModal(mess, "alert alert-danger");
    } else {
      let url = domain + "/api/image";

      uploadImage("POST", url, bodyImage).then(function (resImage) {
        console.log(resImage);
        arr["profile"] = resImage.url;
        let bodyContent = JSON.stringify(arr);
        let url = domain + "/api/admin/";
        asyncApiRequest("POST", url, bodyContent)
          .then(function (data) {
            sendNotificationModal("Usuario creado", "alert alert-success");
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  });

  buttonFooter.appendChild(btnCreate);
  buttonFooter.appendChild(btnPrg);
});

function createBtn(value, typeClass) {
  let newBtn = document.createElement("button");
  newBtn.setAttribute("class", typeClass);
  newBtn.innerText = value;
  return newBtn;
}

function createInput(id) {
  let newInputData = document.createElement("input");
  newInputData.setAttribute("class", "form-control");
  newInputData.setAttribute("data-provide", "datepicker");
  newInputData.setAttribute("name", "inputData");
  newInputData.setAttribute("type", "date");
  newInputData.setAttribute("id", id);

  return newInputData;
}

let myTest = {
  name: patterName,
  name_empresa: patterName,
  email: patternMail,
  start_at: patternDate,
  end_at: patternDate,
};

function switchHiddenBtns(btns, status) {
  btns.forEach((elements) => {
    elements.hidden = status;
  });
}

saveUser.addEventListener("click", function (event) {
  let inputData = document.getElementsByName("inputData");
  let arr = {};
  let bodyImage = new FormData();

  inputData.forEach((element) => {
    if (
      element.id != "profile" &&
      element.id != "newImage" &&
      element.type != "checkbox"
    ) {
      if (element.value.length >= 1) {
        if (myTest[element.id].test(element.value)) {
          arr[element.id] = element.value;
        }
      }
    }
    if (element.type == "file" && element.files.length >= 1) {
      bodyImage.append("image", element.files[0]);
    }
  });

  if (bodyImage.get("image") != null) {
    let url = domain + "/api/user/" + userId + "/image";
    uploadImage("POST", url, bodyImage).then(function () {
      sendNotificationModal(
        "Imagen actualizada correctamente",
        "alert alert-success"
      );
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  }
  let bodyContent = JSON.stringify(arr);

  if (bodyContent.length > 2) {
    let url = domain + "/api/user/" + userId;
    asyncUpdateUser("PUT", url, bodyContent).then(function (data) {
      if (typeof data == "object") {
        sendNotificationModal(
          "Usuario actualizado correctamente",
          "alert alert-success"
        );
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        let parseData = JSON.parse(data);
        if (parseData.status == 400) {
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

          sendNotificationModal(mess, "alert alert-danger");
        }
      }
    });
  }
});

newImage.addEventListener("change", function (event) {
  console.log(event.target.files);
  console.log(event.target.files[0]);
  userImage.src = URL.createObjectURL(event.target.files[0]);
});

checkboxRoles.addEventListener("change", function () {
  saveUser.addEventListener("click", function (event) {
    let roles = [];

    inputData.forEach((element) => {
      if (element.type == "checkbox") {
        if (element.checked) {
          roles.push({ rol_id: element.id, user_id: userId });
        }
      }
    });

    let url = domain + "/api/admin/" + userId + "/roles";
    let bodyRoles = JSON.stringify(roles);
    asyncApiRequest("PUT", url, bodyRoles).then(function (data) {
      if (typeof data == "object") {
        sendNotificationModal(
          "Roles actualizados correctamente",
          "alert alert-success"
        );
        let url = domain + '/api/full-logout/'+ userId
        asyncApiRequest('POST', url).then(function(data){
          console.log(data)
        })
      } else {
        sendNotificationModal(
          "No se ha podido actualizar el rol",
          "alert alert-danger"
        );
      }
    });
  });
});

function offCheckBox() {
  rolCol.checked = false;
  rolClas.checked = false;
  rolDesigner.checked = false;
  rolAdmin.checked = false;
}


btnProgramBaja.addEventListener('click', function(){
  let url = domain + "/api/admin/" + userId + "/program-desactivate"
  let bodyContent = JSON.stringify({
    end_at : '2000/01/01'
  })
  asyncApiRequest('PUT', url, bodyContent).then(function(){
    console.log(data)
    sendNotificationModal("Se ha programado la baja del usuario para el: ", "alert alert-success")

  })
})

btnbajaUser.addEventListener('click', function(){
  let url = domain + "/api/admin/" + userId + "/desactivate-account"
  asyncApiRequest('PUT', url).then(function(data){
    console.log(data)
    sendNotificationModal("Usuario dado de baja correctamente.", "alert alert-success")

  })
})

btnActiveUser.addEventListener('click', function(){
  let url = domain + "/api/admin/" + userId + "/activate-account"
  asyncApiRequest('GET', url).then(function(data){
    console.log(data)
    sendNotificationModal("Usuario dado de alta", "alert alert-success")
  })
})
