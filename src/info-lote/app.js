import { domain, asyncApiRequest, formatDate, sendNotification, switchThem, changeMode } from "../utils/funcs.js";
import { redirect } from "../utils/routes.js";


const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const btnClasificar = document.getElementById("btn-clasificar");
const btnRechazar = document.getElementById("btn-rechazar");

let ubi = document.getElementById("ubi");
let status = document.getElementById("status");
let infoLote = document.getElementById("info-lote");
let observation = document.getElementById("observation");

let url = domain + "/api/componentes";
let componentes = asyncApiRequest("GET", url).then(function (resComp) {
  return resComp;
});

let idLote = localStorage.getItem("loteId");
url = domain + "/api/lote/" + idLote;

asyncApiRequest("GET", url).then(function (lote) {
  infoLote.textContent = "Lote: " + lote.id;
  ubi.textContent = "Ubicación: " + lote.ubi;
  status.textContent = "Estado: " + lote.status;
  observation.textContent = "Observación: " + lote.observation;

  let userLocal = localStorage.getItem("userId");
  if (true) {
    let btnAdd = document.createElement("button");
    btnAdd.setAttribute("class", "bi bi-clipboard-plus-fill btn btn-success");
    btnAdd.id = "add-component";

    let row = document.createElement("tr");
    let lista = createList(componentes);
    row.appendChild(createListCell(lista));
    row.appendChild(createListCell(createInput()));
    row.appendChild(createListCell(btnAdd));

    tblBody.appendChild(row);

    let j= 2

    let componente = document.getElementById("listaComponentes");
    let cantidad = document.getElementById("inputCantidad");

    cantidad.addEventListener('input',function(event){
      if(event.target.value<=0){
        cantidad.value = ""
      }

    })
    componente.addEventListener('change',function(){
      
      let z = 1
      while(z<componente.length){
        if(componente[z].text == "Otro" && componente[z].selected){
          window.location.href = redirect["componentes"]
        }
        z++
      }
      btnAdd.disabled = false
    })


    btnAdd.addEventListener('click',function(){
      let i = 1

      let check = true
      while(i<=componente.length && check){
        if(componente[i].selected){
          check = false
        }
        i++
      }
      if(check){
        sendNotification("No has selecionado un componente", "alert alert-danger")

      }else if(cantidad.value.length == 0){
      sendNotification("No ha introducido una cantidad al componente", "alert alert-danger")

      }else{
        btnClasificar.removeAttribute("disabled");
        btnRechazar.disabled = true;

        let z = 0
        let check = true
        while(z<=componente.length && check){
          if(!componente[z].hidden && !componente[z].disabled &&  componente[z].selected){
            console.log(componente[z].id)
            componente[z].hidden = true
            componente[z].selected = true
            check = false
          }
          z++
        }
        
        let row = table.insertRow();
        row.setAttribute("id", `td${i}`);
        
        let celdaComponente = row.insertCell(0);
        let celdaCantidad = row.insertCell(1);
        let btnDelete = row.insertCell(2);
                
        celdaComponente.innerHTML = componente.value;
        console.log(componente[z-1].id)
        celdaComponente.id = componente[z-1].id
        celdaCantidad.innerHTML = cantidad.value;
        celdaCantidad.setAttribute("name","inputCantidad")
        
        btnDelete.appendChild(createBtnDelete(i));
        
        btnDelete.addEventListener("click", function (event) {
          btnAdd.disabled = false
          let z = event.target.id;
          let idComp =  document.getElementById(`td${z}`).childNodes[0].id
          componente[idComp].removeAttribute("hidden")
          componente[0].selected = true
          document.getElementById(`td${z}`).remove()

          if(tblBody.childNodes.length<=2){
            btnRechazar.removeAttribute("disabled");
            btnClasificar.disabled = true;

          }

        });
        j++;
        btnAdd.disabled = true
      }
     
 
    })

  } else {
    let buttons = document.getElementsByName("btn");
    for (var i = 0, len = buttons.length; i != len; ++i) {
      buttons[0].parentNode.removeChild(buttons[0]);
    }
  }
});

function eliminarFila(id) {
  table.deleteRow(id)
}

function createList(componentes) {
  let lista = document.createElement("select");
  lista.setAttribute("class", "form-select");
  lista.setAttribute("id", "listaComponentes");
  lista.setAttribute("name", "listaComponentes");

  var option = document.createElement("option");
  option.text = "Seleciona un componente";
  option.id = "select"
  option.disabled=  true;
  option.selected=  true;
  lista.appendChild(option);
  componentes.then(function (resArr) {
    let j = 0;
    while (j < resArr.length) {
      var option = document.createElement("option");
      option.id = resArr[j].id;
      option.text = `${resArr[j].name} - ${resArr[j].desc}`;
      option.name = "listaComponentes";
      lista.appendChild(option);
      j++;
    }
    var option = document.createElement("option");
    option.text = "Otro";
    lista.appendChild(option);
  });

  return lista;
}

btnClasificar.addEventListener("click", function () {
  let listaSelected = document.getElementsByName("listaComponentes");
  let inputCantidad = document.getElementsByName("inputCantidad");
  let arrIds = [];
  let arrCant = [];
  let j = 0;
  while (j < listaSelected.length) {
    let i = 0;
    while (i < listaSelected[j].length) {
      if (listaSelected[j][i].hidden) {
        arrIds.push(listaSelected[j][i].id);
        arrCant.push(inputCantidad[j].textContent)
      }
      i++;
    }
    j++;
  }


  let loteId = localStorage.getItem("loteId");
  let bodyContent = JSON.stringify({
    id: arrIds,
    cantidad: arrCant,
    lote_id: loteId,
    user_id: "1",
  });
  let url = domain + "/api/lote/clasificador";
  asyncApiRequest("POST", url, bodyContent).then(function (data) {

     sendNotification(data.message, "alert alert-success")
  });

  console.log(arrIds);
});

function createBtnDelete(i) {
  let btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-danger");
  btnDelete.setAttribute("name", "btnDelete");

  let icon = document.createElement("i");
  icon.setAttribute("class", "bi bi-trash3-fill");
  icon.setAttribute("name", "icoDelete");

  icon.setAttribute("id", i);
  btnDelete.setAttribute("id", i);
  btnDelete.appendChild(icon);


  return btnDelete;
}

function createInput() {
  let inputCantidad = document.createElement("input");
  inputCantidad.setAttribute("class", "form-control");
  inputCantidad.setAttribute("type", "number");
  inputCantidad.setAttribute("id", "inputCantidad");
  return inputCantidad;
}

function createListCell(element) {
  const cell = document.createElement("td");
  cell.appendChild(element);
  return cell;
}
btnRechazar.addEventListener('click',function(){
  let getLocalId = localStorage.getItem("loteId")
  let url = domain + "/api/lote/"+getLocalId+"/rechazar"
  let method = "GET"
  asyncApiRequest(method, url).then(function(){
    sendNotification("El lote ha sido rechazado","alert alert-warning")
  })
})

let switcher = document.getElementById("switcher")

switcher.addEventListener('change',function(event){
  console.log(event.target.checked)
  // changeMode()
})