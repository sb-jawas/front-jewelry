import { sendNotification } from "../utils/funcs.js"

let obs = document.getElementById("obs")
let ubi = document.getElementById("ubi")
let btn = document.getElementById("btn")

const domain = "http://localhost:1234"

btn.addEventListener('click',function(){
    let noti = document.getElementById("notification")

    let loader = document.createElement("div")
    loader.setAttribute("class","loader")
    loader.setAttribute("id","loader")
    noti.appendChild(loader)

    let arr = [ubi.value, obs.value, 1]
    console.log(arr)
    newLote(arr).then(function(res){
        document.getElementById("loader").remove()
        console.log(res)
        sendNotification(res.status,"alert alert-success")
    }).catch(function(error){
        console.log(error)
    })

})
async function newLote(datos){

    let headersList = {
        "Content-Type": "application/json"
    }
    
    let bodyContent = JSON.stringify({
        "ubi":datos[0],
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