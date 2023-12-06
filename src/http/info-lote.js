import { asyncApiRequest, createListCell, domain, sendNotification } from "../utils/funcs.js";

const tblBody = document.getElementById("tbody");
export function cargarLote() {
  let getLoteLocal = localStorage.getItem("loteId");
  let url = domain + "/api/info-despiece/" + getLoteLocal;
  let clasificado = document.getElementById("clasificado")
  asyncApiRequest("GET", url).then(function (data) {

    let i = 0;
    while (i < data.length) {

      let row = document.createElement("tr");

      row.appendChild(createListCell(createTd(data[i].componente)));
      row.appendChild(createListCell(createTd(data[i].cantidad)));
      row.appendChild(createListCell(createTd(data[i].observation)));

      tblBody.appendChild(row);
      i++;
    }
    let h4 = document.createElement("h4")
    h4.textContent = "Clasificado por: "+data[0].clasificador_id
    clasificado.appendChild(h4)
  }).catch(function(error){
    console.log(error)
  });
}

function createTd(data){
    let cell = document.createElement("td");
    cell.innerHTML = data
    return cell
}
