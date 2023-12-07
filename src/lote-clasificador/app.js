import { domain, asyncApiRequest, formatDate, sendNotification } from "../utils/funcs.js";

const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const btnAsign = document.getElementById("btn-asign");
const asignCheck = document.getElementsByName("asign");
let getUserLocal = localStorage.getItem("userId");

let url = domain + "/api/clasificador/disponibles";
let methodApi = "GET";

asyncApiRequest(methodApi, url).then(function (data) {
  createTable(data);
});

function createTable(data) {
  let arr = ["asignarme", "id", "empresa", "created_at", "status"];
  let i = 0;
  let arrDatos = data;

  while (i < arrDatos.length) {
    const row = document.createElement("tr");

    let j = 0;
      while (j < arr.length) {
        const cell = document.createElement("td");

        if (arr[j] == "created_at") {
          let format = formatDate(arrDatos[i][arr[j]]);
          arrDatos[i][arr[j]] = format;
        }

        if (j == 0) {
          const checkBox = document.createElement("input");
          checkBox.setAttribute("type", "checkbox");
          checkBox.setAttribute("name", "asign");
          checkBox.setAttribute("id", arrDatos[i][arr[1]]);
          cell.appendChild(checkBox);
        } else {
          const cellText = document.createTextNode(arrDatos[i][arr[j]]);
          cell.appendChild(cellText);
        }

        row.appendChild(cell);
        j++;
      }
    tblBody.appendChild(row);
    i++;
  }
}

table.addEventListener("change", function (event) {
  btnAsign.removeAttribute("disabled");
});

btnAsign.addEventListener("click", function () {
  btnAsign.setAttribute("disabled","true")
  let noti = document.getElementById("notification")

  let loader = document.createElement("div")
  loader.setAttribute("class","loader")
  loader.setAttribute("id","loader")
  noti.appendChild(loader)

  let i = 0;
  let arrLotes = [];
  while (i < asignCheck.length) {
    if (asignCheck[i].checked) {
      arrLotes.push(asignCheck[i].id);
    }
    i++;
  }
  let bodyContent = JSON.stringify({
    "lote_id": arrLotes
  });
  let getUserLocal = localStorage.getItem("userId")
  let methodApi = "POST";
  let url = domain + "/api/clasificador/"+getUserLocal+"/asign";

  asyncApiRequest(methodApi, url, bodyContent).then(function (data) {
    document.getElementById("loader").remove()
    sendNotification(data.msg,"alert alert-success")
  }).catch(function(error){
    document.getElementById("loader").remove()
    sendNotification("Ha selecionado lotes que ya han sido asignados","alert alert-danger")

    setTimeout(function(){
      location.reload()
    }, 5000)

  });
});

function reqNameUser(id) {
  console.log(id);
  const url = domain + "/api/user/" + id;
  const methodApi = "GET";
  asyncApiRequest(methodApi, url).then(function (data) {
    console.log(data);
  });
}

function createBtnInfo() {
  let btn = document.createElement("button");
}

let checkAll = document.getElementById("check-all");

checkAll.addEventListener("change", function (event) {
  let checked = event.target.checked;

  let i = 0;
  while (i < asignCheck.length) {
    if (checked) {
      asignCheck[i].checked = true;
    } else {
      asignCheck[i].checked = false;
    }
    i++;
  }
});
