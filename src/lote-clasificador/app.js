import { domain, asyncApiRequest, formatDate } from "../utils/funcs.js";


const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const btnAsign = document.getElementById("btn-asign");
const asignCheck = document.getElementsByName("asign");

let url = domain + "/api/lote/";
let methodApi = "GET";

let arrLotes = asyncApiRequest(methodApi, url).then(function (data) {
  let arrUsers = [];
  let i = 1;
  while (i <= data.length) {
    url = domain + "/api/user/" + i;
    arrUsers.push(
      asyncApiRequest(methodApi, url).then(function (data) {
        return data;
      })
    );
    i++;
  }

  createTable(data);
});

function createTable(data) {
  let arr = ["asignarme", "id", "empresa", "created_at", "status"];
  let i = 0;
  let arrDatos = data;
  console.log(data)

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
        if (arrDatos[i]["status_code_id"] == 1) {
          const checkBox = document.createElement("input");
          checkBox.setAttribute("type", "checkbox");
          checkBox.setAttribute("name", "asign");
          checkBox.setAttribute("id", arrDatos[i][arr[1]]);
          console.log(arrDatos[i][arr[1]])
          cell.appendChild(checkBox);
        } else {
          const cellText = document.createTextNode("Asignado");
          cell.appendChild(cellText);
        }
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

tblBody.addEventListener("change", function (event) {
  console.log("lo elimino")
  // btnAsign.removeAttribute("disabled");
});

btnAsign.addEventListener("click", function () {
  let i = 0;
  while (i < asignCheck.length) {
    if (asignCheck[i].checked) {
      let bodyContent = JSON.stringify({
        lote_id: 1,
        user_id: "1",
      });
      console.log(asignCheck[i].id);
      let methodApi = "POST";
      let url = domain + "/api/user/lote";
      asyncApiRequest(methodApi, url, bodyContent).then(function (data) {
        console.log(data);
      });
    }
    i++;
  }
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

let checkAll = document.getElementById("check-all")

checkAll.addEventListener('change',function(event){
  let checked = event.target.checked
  
  let i = 0
  while (i < asignCheck.length) {
    console.log(asignCheck[i])
    if(checked){
      asignCheck[i].checked = true
    }else{
      asignCheck[i].checked = false
    }
  i++
}
})