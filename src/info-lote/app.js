import { domain, asyncApiRequest, formatDate, sendNotification, switchThem, changeMode, deleteButtons, asyncMaps } from "../utils/funcs.js";
import { redirect } from "../utils/routes.js";
import { mainColaborador } from "./colaborador.js";
import { mainEmpresa } from "./empresa.js";


let ubi = document.getElementById("ubi");
let status = document.getElementById("status");
let infoLote = document.getElementById("info-lote");
let observation = document.getElementById("observation");


let idLote = localStorage.getItem("loteId");
let url = domain + "/api/lote/" + idLote;


 


asyncApiRequest("GET", url).then(function (lote) {

  asyncMaps("GET", `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lote.lat} ${lote.long}&key=AIzaSyChi10UcuXjQgdOdXDPGtr-D6s2nsmPQ8c`)
  .then(function(data){
    ubi.textContent = "Ubicación: " + data.results[0].formatted_address
})
.catch(function(error){
  console.log(error)
})
  infoLote.textContent = "Lote: " + lote.id;

  status.textContent = "Estado: " + lote.status;
  observation.textContent = "Observación: " + lote.observation;

  let userLocal = localStorage.getItem("userId");
  let getRolLocal = localStorage.getItem("rolId");
  if (getRolLocal == 2) {
    mainColaborador(lote)
  } else {
    deleteButtons()
    mainEmpresa(lote)
  }
});

