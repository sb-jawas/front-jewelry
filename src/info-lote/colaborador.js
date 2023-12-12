import { cargarLote } from "../http/info-lote.js";
import { asyncApiRequest, domain, sendNotification } from "../utils/funcs.js";

const table = document.getElementById("table");


export function mainColaborador(lote){
    if(lote.status_code == 5){
        cargarLote()
    }else{
        if(lote.status_code == 1){
            let btnCancelar = document.createElement("input")
            btnCancelar.setAttribute("class","btn btn-outline-danger")
            btnCancelar.setAttribute("type","submit")
            btnCancelar.value ="Cancelar donación"
            document.getElementById("container").appendChild(btnCancelar)
            btnCancelar.addEventListener("click",function(){
                let getUserLocal = localStorage.getItem("userId")
                let getLoteLocal = localStorage.getItem("loteId")

                let url = domain + "/api/colaborador/lote/"+getUserLocal+"/cancelar"
                let bodyContent = JSON.stringify({
                    "lote_id": getLoteLocal,
                    "user_id":getUserLocal
                  });
                
                asyncApiRequest("PUT",url, bodyContent)
                .then(function(){
                    sendNotification("Lote cancelado","alert alert-success")
                })
                .catch(function(error){
                    console.log(error)
                    sendNotification("Ha ocurrido un error a la hora de cancelar el lote, pongase en contacto con el adminsitrador","alert alert-danger")
                })
            })
        }
        table.deleteTHead()
    }
}