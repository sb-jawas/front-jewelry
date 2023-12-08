import { domain, asyncApiRequest, formatDate, sendNotification, redirectToMyRol } from "../utils/funcs.js";

const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");

let url = domain + "/api/admin";
let methodApi = "GET";


asyncApiRequest(methodApi, url).then(function (data) {
  if(data.length>=1){
    createTable(data);
  }else{
    sendNotification("No hay usuarios en la base de datos.", "alert alert-info")
  }
});

function createTable(data) {
  let arr = ["name", "email", "role"];
  let i = 0;
  let arrDatos = data;

  while (i < arrDatos.length) {
    const row = document.createElement("tr");

    let j = 0;
      while (j < arr.length) {
        const cell = document.createElement("td");
       if(j==2){
        let btn = document.createElement("button")
        btn.innerHTML = "Gestionar usuario"
        btn.setAttribute("class", "btn btn-primary")
        cell.appendChild(btn);
        }else{
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

