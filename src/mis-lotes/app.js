import { domain, asyncApiRequest, formatDate } from "../utils/funcs.js";

const tblBody = document.getElementById("tbody");

let getUserLocal = localStorage.getItem("userId")
let getRolUser = localStorage.getItem("rolId")
let url = domain + "/api/mis-lotes/" + getUserLocal
if(getRolUser==1){
 url = domain + "/api/user/"+ getUserLocal +"/lotes"
}
let methodApi = "GET";

asyncApiRequest(methodApi, url )
.then(function (data) {
  createTable(data)
  listenerBtnClasificar(tblBody)
});


function createTable(data){
  let arr = ["id", "empresa", "created_at"];
  let i = 0;
  let arrDatos = data;


  while (i < arrDatos.length) {
    const row = document.createElement("tr");
    let j = 0;

    while (j < arr.length+1) {
      const cell = document.createElement("td");

      if (arr[j] == "created_at") {
        let format = formatDate(arrDatos[i][arr[j]]);
        arrDatos[i][arr[j]] = format;
      }


      if(j < arr.length){
        const cellText = document.createTextNode(arrDatos[i][arr[j]]);
        cell.appendChild(cellText);

      }else{
        const redirectInfo = document.createElement("a")
        redirectInfo.href="../info-lote"
        redirectInfo.text = "Ver lote"
        redirectInfo.id = arrDatos[i][arr[0]]
        redirectInfo.setAttribute("class","btn btn-info")
        cell.appendChild(redirectInfo);
      }
      
      
      j++;
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
    i++;
  }
}

function listenerBtnClasificar(btnClasificar){
  btnClasificar.addEventListener('click', function(event){
    let loteid = event.target.id
    localStorage.setItem("loteId",loteid)
  })
}