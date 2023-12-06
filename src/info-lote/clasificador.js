import { cargarLote } from "../http/info-lote.js";
import {
  domain,
  asyncApiRequest,
  sendNotification,
  deleteButtons,
  createListCell
} from "../utils/funcs.js";
import { redirect } from "../utils/routes.js";

const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const btnClasificar = document.getElementById("btn-clasificar");
const btnRechazar = document.getElementById("btn-rechazar");

export function mainClasificador(lote) {
  if (lote.status_code < 5) {
    let url = domain + "/api/componentes";
    let componentes = asyncApiRequest("GET", url).then(function (resComp) {
      return resComp;
    });

    let btnAdd = document.createElement("button");
    btnAdd.setAttribute("class", "bi bi-clipboard-plus-fill btn btn-success");
    btnAdd.id = "add-component";

    let row = document.createElement("tr");
    let lista = createList(componentes);
    row.appendChild(createListCell(lista));
    row.appendChild(createListCell(createInput("number")));
    row.appendChild(createListCell(createInput("text")));
    row.appendChild(createListCell(btnAdd));

    tblBody.appendChild(row);

    let j = 2;

    let componente = document.getElementById("listaComponentes");
    let cantidad = document.getElementById("inputCantidad");
    let observation = document.getElementById("inputObservation");

    cantidad.addEventListener("input", function (event) {
      if (event.target.value <= 0) {
        cantidad.value = "";
      }
    });
    componente.addEventListener("change", function () {
      let z = 1;
      while (z < componente.length) {
        if (componente[z].text == "Otro" && componente[z].selected) {
          window.location.href = redirect["componentes"];
        }
        z++;
      }
      btnAdd.disabled = false;
    });

    btnAdd.addEventListener("click", function () {
      let i = 1;

      let check = true;
      while (i <= componente.length && check) {
        if (componente[i].selected) {
          check = false;
        }
        i++;
      }
      if (check) {
        sendNotification( "No has selecionado un componente", "alert alert-danger" );
      } else if (cantidad.value.length == 0) {
        sendNotification( "No ha introducido una cantidad al componente", "alert alert-danger" );
      } else {

        btnClasificar.removeAttribute("disabled");
        btnRechazar.disabled = true;

        let z = 0;
        let check = true;
        while (z <= componente.length && check) {
          if (!componente[z].hidden && !componente[z].disabled && componente[z].selected ) {
            console.log(componente[z].id);
            componente[z].hidden = true;
            componente[z].selected = true;
            check = false;
          }
          z++;
        }

        let row = table.insertRow();
        row.setAttribute("id", `td${i}`);

        let celdaComponente = row.insertCell(0);
        let celdaCantidad = row.insertCell(1);
        let celdaObservation = row.insertCell(2);

        let btnDelete = row.insertCell(3);

        celdaComponente.innerHTML = componente.value;
        celdaComponente.id = componente[z - 1].id;
        celdaCantidad.innerHTML = cantidad.value;
        celdaCantidad.setAttribute("name", "inputCantidad");
        celdaObservation.innerHTML = observation.value;
        celdaObservation.setAttribute("name", "inputObservation");

        btnDelete.appendChild(createBtnDelete(i));

        btnDelete.addEventListener("click", function (event) {
          btnAdd.disabled = false;
          let z = event.target.id;
          let idComp = document.getElementById(`td${z}`).childNodes[0].id;
          componente[idComp].removeAttribute("hidden");
          componente[0].selected = true;
          document.getElementById(`td${z}`).remove();

          if (tblBody.childNodes.length <= 2) {
            btnRechazar.removeAttribute("disabled");
            btnClasificar.disabled = true;
          }
        });
        j++;
        btnAdd.disabled = true;
      }
    });

    listenerBtnClasificar(btnClasificar)
    listenerbtnRechazar(btnRechazar)

  } else {
    deleteButtons();
    sendNotification("Este lote ya ha sido clasificado, y no se pude volver a clasificar", "alert alert-warning");
    cargarLote();
  }
}

function createList(componentes) {
  let lista = document.createElement("select");
  lista.setAttribute("class", "form-select");
  lista.setAttribute("id", "listaComponentes");
  lista.setAttribute("name", "listaComponentes");

  var option = document.createElement("option");
  option.text = "Seleciona un componente";
  option.id = "select";
  option.disabled = true;
  option.selected = true;
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

function createInput(type) {
  let inputCantidad = document.createElement("input");
  inputCantidad.setAttribute("class", "form-control");
  inputCantidad.setAttribute("type", type);
  if (type == "number") {
    inputCantidad.setAttribute("id", "inputCantidad");
  } else {
    inputCantidad.setAttribute("id", "inputObservation");
  }
  return inputCantidad;
}



function listenerBtnClasificar(btnClasificar){
  btnClasificar.addEventListener("click", function () {
    let listaSelected = document.getElementsByName("listaComponentes");
    let inputCantidad = document.getElementsByName("inputCantidad");
    let inputObservation = document.getElementsByName("inputObservation");
    let arrIds = [];
    let arrCant = [];
    let arrObs = [];
    let i = 0;

    while (i < listaSelected.length) {
      let j = 0;

      while (j < listaSelected[i].length) {
        if (listaSelected[i][j].hidden) {
          arrIds.push(listaSelected[i][j].id);
        }
        j++;
      }
      i++;
    }

    let z = 0;
    while (z < inputObservation.length) {
      arrObs.push(inputObservation[z].textContent);
      arrCant.push(inputCantidad[z].textContent);

      z++;
    }

    let loteId = localStorage.getItem("loteId");
    let bodyContent = JSON.stringify({
      id: arrIds,
      cantidad: arrCant,
      observation: arrObs,
      user_id: "1",
    });
    
    let url = domain + "/api/clasificador/" + loteId + "/clasificar";
    asyncApiRequest("PUT", url, bodyContent).then(function (data) {
      sendNotification(data.message, "alert alert-success");
      setTimeout(function(){
        location.reload();
      },5000)
    });

  });
}

function listenerbtnRechazar(btnRechazar){
  btnRechazar.addEventListener("click", function () {
    let getLoteLocal = localStorage.getItem("loteId");
    let url = domain + "/api/clasificador/" + getLoteLocal + "/rechazar";
    let method = "PATCH";
    asyncApiRequest(method, url).then(function () {
      sendNotification("El lote ha sido rechazado", "alert alert-warning");
    }).catch(function(error){
      sendNotification("No ha sido posible rechazar el lote. <br> Contacte con un adminsitrador para solucionar el problema.", "alert alert-warning");
    });
  });
}