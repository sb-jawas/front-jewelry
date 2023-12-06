import { asyncApiRequest, createListCell, domain, formatDateWithTime, sendNotification } from "../utils/funcs.js";
import { redirect } from "../utils/routes.js";

const tblBody = document.getElementById("tbody");
const table = document.getElementById("table");

export function mainColaborador(){
    updateTable()
    let getUserLocal = localStorage.getItem("userId")
    let url = domain + "/api/colaborador/"+ getUserLocal + "/mis-lotes/"
    asyncApiRequest("GET",url)
    .then(function(lotes){
            let i = 0
            while(i<lotes.length){
                let infoLote = document.createElement("td")  
                infoLote.innerHTML = "LBS_"+lotes[i].id
                let row = document.createElement("tr")
                let infoLote2 = document.createElement("td")  
                infoLote2.innerHTML = lotes[i].name
                let infoLote3 = document.createElement("td")  
                infoLote3.innerHTML = formatDateWithTime(lotes[i].created_at)

                let btn = document.createElement("input")
                
                btn.id = lotes[i].id
                btn.setAttribute("class","btn btn-info")
                btn.setAttribute("type","submit")
                btn.value = "Ver lote"
            
                row.appendChild(infoLote)
                row.appendChild(infoLote2)
                row.appendChild(infoLote3)
                row.appendChild(btn)

                tblBody.appendChild(row)
                // console.log(lotes[i].id, lotes[i].status, formatDateWithTime(lotes[i].created_at))
                i++
            }

            tblBody.addEventListener("click",function(event){
                if(event.target.type != undefined){
                    localStorage.setItem("loteId",event.target.id)
                    window.location.href= redirect["info-lote"]
                }
            })

    })
    .catch(function(){
        sendNotification("No ha creado ningún lote todavía", "alert alert-warning")

    })
}

function updateTable(){
    table.deleteTHead()
    let thead = document.createElement("thead")
    let row = document.createElement("tr")
    let cell1 = document.createElement("th")
    cell1.innerHTML="Número de lote"

    let cell2 = document.createElement("th")
    cell2.innerHTML="Estado"

    let cell3 = document.createElement("th")
    cell3.innerHTML="Fecha de donación"

    row.appendChild(cell1)
    row.appendChild(cell2)
    row.appendChild(cell3)

    thead.appendChild(row)
    table.appendChild(thead)
}