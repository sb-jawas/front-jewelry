import { asyncApiRequest, domain } from "../utils/funcs.js"

const lista = document.getElementById("select-rol")
let getLocalUser = localStorage.getItem("userId")
let url = domain +"/api/user/"+ getLocalUser +"/mis-roles"
let method = "GET"
let roles = asyncApiRequest(method, url).then(function(resData){
    console.log(resData)
})

lista.addEventListener('click', function(){
    console.log("llego")
})