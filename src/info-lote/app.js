import { domain, asyncApiRequest, formatDate } from "../utils/funcs.js";

const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const btnClasificar = document.getElementById("btn-clasificar");
const btnRechazar = document.getElementById("btn-rechazar");

let ubi = document.getElementById("ubi");
let status = document.getElementById("status");
let infoLote = document.getElementById("info-lote");
let observation = document.getElementById("observation");

let i = 1;
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
  if (lote.user_id == userLocal) {
    let btnAdd = document.createElement("i");
    btnAdd.setAttribute("class", "bi bi-clipboard-plus-fill btn btn-success");
    btnAdd.id = "add-component";

    let row = document.createElement("tr");
    let lista = createList(componentes);
    row.appendChild(createListCell(lista));
    row.appendChild(createListCell(createInput()));
    row.appendChild(createListCell(btnAdd));

    tblBody.appendChild(row);

    let addComponent = document.getElementById("add-component");
    let listaDesplegable = document.getElementById("listaComponentes");
    let inputCant = document.getElementById("inputCantidad");

    listaDesplegable.addEventListener("input", function (event) {
      btnClasificar.removeAttribute("disabled");
      btnRechazar.removeAttribute("disabled");

      inputCant.addEventListener("input", function (eventInput) {
        let input = eventInput.target.value;
        let i = 0;
        while (i < event.target.length ) {
          if (event.target[i].selected) {
              let hiddenElement = event.target[i];
              
              let labelPieza = document.createElement("label");
              labelPieza.textContent = event.target[i].text;
              
              let labelCantidad = document.createElement("label");
              labelCantidad.textContent = input;
              
              listenerBtnAdd(addComponent, labelPieza, labelCantidad, hiddenElement);

          }
          i++;
        }
      });
    });
  } else {
    let buttons = document.getElementsByName("btn");
    for (var i = 0, len = buttons.length; i != len; ++i) {
      buttons[0].parentNode.removeChild(buttons[0]);
    }
  }
});

function listenerBtnAdd(
  addComponent,
  selectedLista,
  inputCantidad,
  hiddenElement
) {
  addComponent.addEventListener("click", function () {
    hiddenElement.setAttribute("hidden", true);
    hiddenElement.selected=false
    let btnDelete = createBtnDelete();

    btnDelete.addEventListener("click", function (event) {
      let idBtn = event.target.id;
      document.getElementById(`td${idBtn}`).remove();
    });

    let arr = [selectedLista, inputCantidad, btnDelete];
    addInsert(arr, i);
    i++;
  });
}

function addInsert(elements, id) {
  const row = document.createElement("tr");
  row.setAttribute("id", `td${id}`);
  let cell = null;
  let i = 0;
  while (i < elements.length) {
    cell = document.createElement("td");
    cell.appendChild(elements[i]);
    row.appendChild(cell);
    i++;
  }
  tblBody.appendChild(row);
}

function createList(componentes) {
  let lista = document.createElement("select");
  lista.setAttribute("class", "form-select");
  lista.setAttribute("id", "listaComponentes");
  lista.setAttribute("name", "listaComponentes");

  var option = document.createElement("option");
  option.text = "Seleciona un componente";
  option.setAttribute("disabled", true);
  option.setAttribute("selected", true);
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
  let arrIds = [];
  let j = 0;
  while (j < listaSelected.length) {
    let i = 0;
    while (i < listaSelected[j].length) {
      if (listaSelected[j][i].selected) {
        arrIds.push(listaSelected[j][i].id);
      }
      i++;
    }
    j++;
  }
  let loteId = localStorage.getItem("loteId");
  let bodyContent = JSON.stringify({
    id: arrIds,
    cantidad: ["2", "2", "2"],
    lote_id: loteId,
    user_id: "1",
  });
  let url = domain + "/api/lote/clasificador";
  asyncApiRequest("POST", url, bodyContent).then(function (data) {
    console.log(data);
  });

  console.log(arrIds);
});

function createBtnDelete() {
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
