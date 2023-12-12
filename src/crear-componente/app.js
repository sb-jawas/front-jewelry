import { createComponente } from "../http/componente.js"
import { getLocalStorage, redirectToMyRol, sendNotification } from "../utils/funcs.js"


let nameComp = document.getElementById("name")
let descComp = document.getElementById("desc")
let checkBox = document.getElementById("hardware") 
let btnSubmit = document.getElementById("btnSubmit")

btnSubmit.addEventListener("click",function(event){
    if(nameComp.value.length >1 && descComp.value.length >1 ){
        let bodyContent = ""
        if(checkBox.checked){
            bodyContent = JSON.stringify({
                "created_user_id": getLocalStorage("userId"),
                "name":nameComp.value,
                "desc":descComp.value,
                "is_hardware": 1
            })
        }else{
            bodyContent = JSON.stringify({
                "created_user_id": getLocalStorage("userId"),
                "name":nameComp.value,
                "desc":descComp.value,
                "is_hardware": 0
            })
        }
        console.log(bodyContent)
        createComponente(bodyContent)
    
    }else{
        sendNotification("Es necesario rellenar todos los campos.","alert alert-danger")
    }
})