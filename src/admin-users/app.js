import { domain, asyncApiRequest, formatDate, sendNotification, redirectToMyRol } from "../utils/funcs.js";

const table = document.getElementById("table");
let searchUser = document.getElementById("searchUser")
let countUsers = document.getElementById("countUsers")

let url = domain + "/api/admin";
let methodApi = "GET";


asyncApiRequest(methodApi, url).then(function (data) {
  if(data.length>=1){
    countUsers.innerText = `Se han encontrado ${data.length} usuarios.`
    createTable(data);

  }else{
    sendNotification("No hay usuarios en la base de datos.", "alert alert-info")
  }
});

function createTable(data) {
  let arr = ["name", "email", "role"];
  let i = 0;
  let arrDatos = data;

  while (i < arrDatos.length) {
    const row = document.createElement("tr");
    row.id = data[i].id

    let j = 0;
      while (j < arr.length) {
        const cell = document.createElement("td");
       if(j==2){
        let btn = document.createElement("button")
        btn.innerHTML = "Gestionar usuario"
        btn.setAttribute("data-bs-toggle", "modal")
        btn.setAttribute("data-bs-target" , "#modalProfile")
        btn.setAttribute("class", "btn btn-primary")
        btn.addEventListener('click',function(event){
          let userId = event.target.parentNode.parentNode.id
          let url = domain + "/api/user/" + userId
          asyncApiRequest("GET",url).then(function(user){
            document.getElementById("userName").innerHTML = "ID usuario: " + user.msg.id
          })
        })
        cell.appendChild(btn);
        }else{
          const cellText = document.createTextNode(arrDatos[i][arr[j]]);
          cell.appendChild(cellText);

        }

        row.appendChild(cell);
        j++;
      }
    document.getElementById("tbody").appendChild(row);
    i++;
  }
}

searchUser.addEventListener('input',function(event){
  let bodyContent = JSON.stringify({
    "email" : event.target.value
  })
  let url = domain + "/api/admin/search"
  asyncApiRequest("POST",url, bodyContent).then(function(data){
    document.getElementById("tbody").remove()
    let newTbody = document.createElement("tbody")
    newTbody.setAttribute("id","tbody")
    table.appendChild(newTbody)
    countUsers.innerText = `Se han encontrado ${data.length} usuarios.`
    createTable(data)
  })
})