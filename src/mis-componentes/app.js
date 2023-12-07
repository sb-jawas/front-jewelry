import {
    activeButtons,
  asyncApiRequest,
  disableButtons,
  domain,
  getLocalStorage,
  sendNotification,
} from "../utils/funcs.js";

let tblbody = document.getElementById("tbody");
let methodApi = "GET";
let url = domain;

switch (getLocalStorage("rolId")) {
  case "2":
    url += "/api/clasificador/" + getLocalStorage("userId") + "/componentes";
    break;

  case "4":
    url += "/api/componentes";

    break;

  default:
    sendNotification(
      "No tiene permisos para acceder a esta vista.<br>Contancte con un adminstrador para poder solicitar los permisos.",
      "alert alert-danger"
    );
    setTimeout(function () {
      window.location.href = "/select-rol";
    }, 5000);
    break;
}

asyncApiRequest(methodApi, url)
  .then(function (data) {
    console.log(data[0].id);
    let arr = ["id", "name", "desc", "is_hardware"];
    let i = 0;
    while (i < data.length) {
      let j = 0;
      let row = document.createElement("tr");
      while (j < arr.length) {
        switch (arr[j]) {
          case "id":
            row.appendChild(
              createInput(data[i][arr[j]], "number", "form-control")
            );

            break;
          case "name":
            row.appendChild(
              createInput(data[i][arr[j]], "text", "form-control")
            );

            break;
          case "desc":
            row.appendChild(createTextArea(data[i][arr[j]]));

            break;
          case "is_hardware":
            row.appendChild(
              createInput(data[i][arr[j]], "checkbox", "form-check-input")
            );

            break;
        }
        j++;
      }
      row.appendChild(createBtn(data[i].id));
      tblbody.appendChild(row);
      i++;
    }
  })
  .catch(function () {});

function createInput(value, type, typeOfClass) {
  let td = document.createElement("td");
  let inputCell = document.createElement("input");
  inputCell.setAttribute("disabled", true);
  inputCell.setAttribute("class", typeOfClass);
  inputCell.setAttribute("type", type);
  inputCell.setAttribute("placeholder", value);
  td.appendChild(inputCell);
  return td;
}

function createTextArea(value){
    let td = document.createElement("td");
    let inputCell = document.createElement("textarea");
    inputCell.setAttribute("disabled", true);
    inputCell.setAttribute("class", "form-control");
    inputCell.setAttribute("placeholder", value);
    td.appendChild(inputCell);
    return td;
}

function createBtn(id) {
  let btn = document.createElement("button");
  btn.setAttribute("type", "submit");
  btn.setAttribute("name", "btn");
  btn.setAttribute("class", "btn btn-warning");
  btn.setAttribute("id", `btn${id}`);
  btn.addEventListener("click", function () {
    let i = 0
    let size = btn.parentNode.parentElement.childNodes.length

    while(i<size){
        if(i>=1){
            btn.parentNode.parentElement.childNodes[i].firstChild.removeAttribute("disabled")
        }
        i++
    }

    let aux = 0
    let btnSave = document.createElement("input")
    btnSave.setAttribute("type", "submit");
    btnSave.setAttribute("name", "btn");

    btnSave.setAttribute("class", "btn btn-success");
    btnSave.setAttribute("value","Guardar")
    btnSave.setAttribute("disabled", true)

    let btnCancelar = document.createElement("input")
    btnCancelar.setAttribute("type", "submit");
    btnCancelar.setAttribute("class", "btn btn-danger");
    btnCancelar.setAttribute("value","Cancelar")
    btnCancelar.setAttribute("disabled", true)
    btnCancelar.setAttribute("name", "btn");


    btn.parentNode.appendChild(btnSave)
    btn.parentNode.appendChild(btnCancelar)

    btn.disabled = true

    tblbody.addEventListener('input', function(){
        btnSave.removeAttribute("disabled")
        btnCancelar.removeAttribute("disabled")
    })

    btnSave.addEventListener('click',function(event){
        let z = 0
        let size = event.target.parentNode.parentElement.childNodes.length
        while(z<size){
            console.log(event.target.parentNode.parentElement.childNodes[z].firstChild.value)
            z++
        }
    })

    btnCancelar.addEventListener('click',function(event){
    
    
        let u = 0
        let size = event.target.parentNode.parentElement.childNodes.length
        while(u<size){
            if(u>=1 || u<=3){
                event.target.parentNode.parentElement.childNodes[u].firstChild.setAttribute("disabled",true)
            }
            u++
        }
        let id =   event.target.parentNode.parentElement.childNodes[0].firstChild.placeholder
        let url = domain
        switch (getLocalStorage("rolId")) {
            case "2":
              url += "/api/clasificador/" + getLocalStorage("userId") + "/componentes/" +id
              break;
          
            case "4":
              url += "/api/componentes/"+id
          
              break;
          }
        disableButtons()

        asyncApiRequest("GET", url)
        .then(function(data){
            console.log(data)
            event.target.parentNode.parentElement.childNodes[1].firstChild.value = data.name
            event.target.parentNode.parentElement.childNodes[2].firstChild.value = data.desc
            event.target.parentNode.parentElement.childNodes[3].firstChild.value = data.is_hardware
            btn.parentNode.removeChild(btnCancelar)        
            btn.parentNode.removeChild(btnSave)
            btn.disabled = false   
            activeButtons()
            sendNotification("Error al cancelar el componente","alert alert-danger")

        }).catch(function(error){
            
            sendNotification("Error al cancelar el componente","alert alert-danger")
            setTimeout(function(){
                location.reload()
            }, 5000)
            activeButtons()
        })
     
    })

    
  });
  let td = document.createElement("td");
  btn.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
  td.appendChild(btn);

  return td;
}