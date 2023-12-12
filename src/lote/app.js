import { sendNotification, domain, asyncApiRequest, getLocalStorage } from "../utils/funcs.js";
import { navbar } from "../utils/navbar.js";
import { geocode } from "./maps.js";

let obs = document.getElementById("obs");
let ubi = document.getElementById("ubi");
let btn = document.getElementById("btn");

navbar(getLocalStorage("userName"),"Colaborador")
// btn.addEventListener("click", function (event) {
//     geocode({ address: ubi.value }).then(function(){

//         if (ubi.value.length > 1 && obs.value.length > 1) {
//             btn.setAttribute("disabled", "true");
      
//             let noti = document.getElementById("notification");
      
//             let loader = document.createElement("div");
//             loader.setAttribute("class", "loader");
//             loader.setAttribute("id", "loader");
//             noti.appendChild(loader);
            
//             let getUserLocal = localStorage.getItem("userId");
//             let arr = [ubi.value, obs.value, getUserLocal];
            
      
//           newLote(arr)
//             .then(function (res) {
//               document.getElementById("loader").remove();
//               sendNotification(res.status, "alert alert-success");
      
//               setTimeout(() => {
//                 location.reload();
//               }, 5000);
//             });
//         } else {
//           sendNotification(
//             "Es obligatorio rellenar ambos campos",
//             "alert alert-danger"
//           );
//         }
//     }).catch(function(error){
//         console.log(error)
//     })
// });

export async function newLote(datos) {
  console.log(datos)
  let lat = localStorage.getItem("lat");
  let long = localStorage.getItem("long");

  let url = domain + "/api/colaborador/lote";
  
  let bodyContent = JSON.stringify({
    ubi: [lat, long],
    observation: datos[1],
    user_id: datos[2],
  });

  return asyncApiRequest("POST",url,bodyContent)

}
