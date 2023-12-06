import { domain, asyncApiRequest, formatDate, sendNotification, switchThem, changeMode, deleteButtons, asyncMaps } from "../utils/funcs.js";
import { redirect } from "../utils/routes.js";
import { mainClasificador } from "./clasificador.js";
import { mainColaborador } from "./colaborador.js";



let ubi = document.getElementById("ubi");
let status = document.getElementById("status");
let infoLote = document.getElementById("info-lote");
let observation = document.getElementById("observation");


let getRolLocal = localStorage.getItem("rolId");
let userLocal = localStorage.getItem("userId");

let idLote = localStorage.getItem("loteId");
let url = null 

switch (getRolLocal) {
  case "1":
    url = domain + "/api/colaborador/"+ userLocal + "/lote/" + idLote
    break;

    case "2":
      url = domain + "/api/clasificador/lote/" + idLote
    break;
    default:
      console.log("llego")
      break;
}


 

asyncApiRequest("GET", url).then(function (lote) {

  asyncMaps("GET", `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lote[0].lat} ${lote[0].long}&key=AIzaSyChi10UcuXjQgdOdXDPGtr-D6s2nsmPQ8c`)
  .then(function(data){
    ubi.textContent = "Ubicación: " + data.results[0].formatted_address
}).catch(function(){
  ubi.textContent = "Ubicación no encontrada"

})

  infoLote.textContent = "Lote: " + lote[0].id;
  status.textContent = "Estado: " + lote[0].status;
  observation.textContent = "Observación: " + lote[0].observation;

  if (getRolLocal == 2) {
    mainClasificador(lote[0])
  } else {
    deleteButtons()
    mainColaborador(lote[0])
  }
}).catch(function(){
  deleteButtons()
  sendNotification("Este lote no existe","alert alert-warning")

});

