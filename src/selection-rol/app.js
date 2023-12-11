import { asyncApiRequest, domain } from "../utils/funcs.js"
import { rolRoute } from "../utils/routes.js"

const lista = document.getElementById("select-rol")
let submitRol = document.getElementById("submit-rol")
let getLocalUser = localStorage.getItem("userId")

let url = domain +"/api/user/"+ getLocalUser +"/mis-roles"
let method = "GET"

asyncApiRequest(method, url).then(function(resData){
    if(resData.length==1){
        localStorage.setItem("rolId",resData[0].id)
        window.location.href = rolRoute[resData[0].name]
    }else{
        let i = 0
        console.log(rolRoute[resData[0].name])
        while(i<resData.length){
            let option = document.createElement("option")
            option.id = resData[i].id
            option.text = resData[i].name
            option.href = rolRoute[resData[i].name]
            lista.appendChild(option)
            i++
        }
    }
    console.log(resData)
})


submitRol.addEventListener('click', function(){
    let i = 0
    while(i<lista.length){
        if(lista[i].selected){
            localStorage.setItem("rolId",lista[i].id)
            window.location.href = lista[i].href
        }
        i++
    }
})

