import { sendNotification, domain } from "../utils/funcs.js"

let obs = document.getElementById("obs")
let ubi = document.getElementById("ubi")
let btn = document.getElementById("btn")

btn.addEventListener('click',function(){
    btn.setAttribute("disabled","true")
    let noti = document.getElementById("notification")

    let loader = document.createElement("div")
    loader.setAttribute("class","loader")
    loader.setAttribute("id","loader")
    noti.appendChild(loader)

    let arr = [ubi.value, obs.value, 1]
    console.log(arr)
    newLote(arr).then(function(res){
        document.getElementById("loader").remove()
        sendNotification(res.status,"alert alert-success")

        setTimeout(() => {
            location.reload();
        }, 5000);

    }).catch(function(error){
        console.log(error)
    })

})
async function newLote(datos){

    let headersList = {
        "Content-Type": "application/json"
    }
    let getLocalUbi = localStorage.getItem("ubi")
    let bodyContent = JSON.stringify({
        "ubi":getLocalUbi,
        "observation":datos[1],
        "user_id":datos[2]
    });
    let url = domain+"/api/lote"
    let response = await fetch(url, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    
    let data = await response.json();
    return data
}