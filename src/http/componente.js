import { activeButtons, asyncApiRequest, domain, getLocalStorage, sendNotification } from "../utils/funcs.js";

export function createComponente(bodyContent){
    let method = "POST"
    let url = domain + "/api/componentes"

    asyncApiRequest(method,url,bodyContent).then(function(){
        sendNotification("Componente creado correctamente.","alert alert-success")
    })
    .catch(function(){

    })
}

export function updateComponente(bodyContent, componenteId){
    let method = "PATCH"
    let url = domain + "/api/componentes/"+componenteId

    asyncApiRequest(method,url,bodyContent).then(function(){
        sendNotification("Componente actualizado correctamente.","alert alert-success")
        activeButtons()
    })
    .catch(function(){
        sendNotification("No ha sido posible realizar la actualización del componente.","alert alert-danger")
        activeButtons()
    })
}

export function deleteComponente(componenteId){
    let method = "DELETE"
    let url = domain + "/api/componentes/"+componenteId
    let bodyContent = JSON.stringify({
        "user_id":getLocalStorage("userId")
    })

    asyncApiRequest(method,url,bodyContent).then(function(){
        sendNotification("Componente eliminado correctamente.","alert alert-success")
        document.getElementById(`btn${componenteId}`).parentNode.parentElement.remove();
        activeButtons()

    })
    .catch(function(){
        sendNotification("No ha sido posible eliminar el componente.","alert alert-danger")
        activeButtons()
    })
}