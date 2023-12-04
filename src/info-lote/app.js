import { domain, asyncApiRequest, formatDate, sendNotification, switchThem, changeMode, deleteButtons } from "../utils/funcs.js";
import { redirect } from "../utils/routes.js";
import { mainColaborador } from "./colaborador.js";
import { mainEmpresa } from "./empresa.js";


let ubi = document.getElementById("ubi");
let status = document.getElementById("status");
let infoLote = document.getElementById("info-lote");
let observation = document.getElementById("observation");


let idLote = localStorage.getItem("loteId");
let url = domain + "/api/lote/" + idLote;


 
//   asyncApiRequest("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyChi10UcuXjQgdOdXDPGtr-D6s2nsmPQ8c")
//   .then(function(data){
//     console.log(data)
// })
// .catch(function(error){
//   console.log(error)
// })

asyncApiRequest("GET", url).then(function (lote) {
  infoLote.textContent = "Lote: " + lote.id;
  ubi.textContent = "Ubicación: " + lote.ubi;
  status.textContent = "Estado: " + lote.status;
  observation.textContent = "Observación: " + lote.observation;

  let userLocal = localStorage.getItem("userId");
  let getRolLocal = localStorage.getItem("rolId");
  if (getRolLocal == 2) {
    console.log(lote)
    mainColaborador(lote)
  } else {
    deleteButtons()
    mainEmpresa(lote)
  }
});

