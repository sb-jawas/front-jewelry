import { deleteComponente, updateComponente } from "../http/componente.js";
import {
    activeButtons,
  asyncApiRequest,
  disableButtons,
  domain,
  getLocalStorage,
  sendNotification,
} from "../utils/funcs.js";
import { navbar } from "../utils/navbar.js";



let tblbody = document.getElementById("tbody");
let methodApi = "GET";
let url = domain;

switch (getLocalStorage("rolId")) {
  case "2":
    url += "/api/clasificador/" + getLocalStorage("userId") + "/componentes";
    navbar(getLocalStorage("userName"),"Clasificador")

    break;

  case "4":
    url += "/api/componentes/admin";
     navbar(getLocalStorage("userName"),"Admin")


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
              createInput(data[i][arr[j]], "text", )
            );

            break;
          case "desc":
            row.appendChild(createTextArea(data[i][arr[j]]));

            break;
          case "is_hardware":
            row.appendChild(createCheckbox(data[i][arr[j]]));

            break;
        }
        j++;
      }
      row.appendChild(createBtn());
      row.appendChild(btnDelte(data[i].id))
      tblbody.appendChild(row);
      i++;
    }
  })
  .catch(function () {});

function createInput(value, type) {
  let td = document.createElement("td");
  let inputCell = document.createElement("input");
  inputCell.setAttribute("disabled", true);
  inputCell.setAttribute("class", "form-control");
  inputCell.setAttribute("type", type);
  inputCell.setAttribute("placeholder", value);
  td.appendChild(inputCell);
  return td;
}

function createCheckbox(selected ) {
    let td = document.createElement("td");
    let inputCell = document.createElement("input");
    inputCell.setAttribute("disabled", true);
    inputCell.setAttribute("class", "form-check-input");
    inputCell.setAttribute("type","checkbox" );
    if(selected){
        inputCell.setAttribute("checked", true)
    }
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

function createBtn() {
  let btn = document.createElement("button");
  btn.setAttribute("type", "submit");
  btn.setAttribute("name", "btn");
  btn.setAttribute("class", "btn btn-warning m-1");
  btn.addEventListener("click", function () {
    let i = 0
    let size = btn.parentNode.parentElement.childNodes.length

    while(i<size){
        if(i>=1){
            btn.parentNode.parentElement.childNodes[i].firstChild.removeAttribute("disabled")
        }
        i++
    }

    let btnSave = document.createElement("input")
    btnSave.setAttribute("type", "submit");
    btnSave.setAttribute("name", "btn");

    btnSave.setAttribute("class", "btn btn-success m-1");
    btnSave.setAttribute("value","Guardar")
    btnSave.setAttribute("disabled", true)

    let btnCancelar = document.createElement("input")
    btnCancelar.setAttribute("type", "submit");
    btnCancelar.setAttribute("class", "btn btn-outline-danger m-1");
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
        let size = event.target.parentNode.parentElement.childNodes.length-2
        let vec = []
        while(z<size){
            if(z==3){
                vec.push(event.target.parentNode.parentElement.childNodes[z].firstChild.checked)

            }else{
                vec.push(event.target.parentNode.parentElement.childNodes[z].firstChild.value)
            }
            z++
        }

        if(vec[3]){
            vec[3] = "1"
        }else{
            vec[3] = "0"
        }
        
        
        let bodyContent = JSON.stringify({
            "user_id":getLocalStorage("userId"),
            "name": vec[1],
            "desc": vec[2],
            "is_hardware": vec[3]
        })
        
        disableButtons()
        let componenteId = event.target.parentNode.parentElement.childNodes[0].firstChild.placeholder
        updateComponente(bodyContent, componenteId)
        btn.parentNode.removeChild(btnCancelar)        
        btn.parentNode.removeChild(btnSave)
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
              url += "/api/componentes/admin"+id
          
              break;
          }
        disableButtons()

        asyncApiRequest("GET", url)
        .then(function(data){
            event.target.parentNode.parentElement.childNodes[1].firstChild.value = data.name
            event.target.parentNode.parentElement.childNodes[2].firstChild.value = data.desc
            event.target.parentNode.parentElement.childNodes[3].firstChild.value = data.is_hardware
            btn.parentNode.removeChild(btnCancelar)        
            btn.parentNode.removeChild(btnSave)
            btn.disabled = false   
            activeButtons()
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
  btn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
  td.appendChild(btn);
  return td;
}

function btnDelte(id){
    let td = document.createElement("td");
    let btnDelete = document.createElement("button")
    btnDelete.setAttribute("type", "submit");
    btnDelete.setAttribute("class", "btn btn-danger m-1");
    btnDelete.setAttribute("value","Eliminar")
    btnDelete.setAttribute("id", `btn${id}`);
    btnDelete.setAttribute("name", "btn");

    btnDelete.addEventListener('click', function(event){
        disableButtons()
        deleteComponente(id, btnDelete)
    })
  td.appendChild(btnDelete)
  btnDelete.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
  return td

}