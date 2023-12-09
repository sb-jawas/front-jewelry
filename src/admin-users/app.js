import { asyncUser } from "../http/user.js";
import { domain, asyncApiRequest, formatDate, sendNotification, redirectToMyRol, patterName, patternMail, patternPass, patternDate } from "../utils/funcs.js";

const table = document.getElementById("table");
let searchUser = document.getElementById("searchUser")
let countUsers = document.getElementById("countUsers")
let addUser = document.getElementById("addUser")

let btnbajaUser = document.getElementById("baja")
let btnProgramBaja = document.getElementById("programBaja")
let btnActiveUser = document.getElementById("activarUser")
let buttonFooter = document.getElementById("buttons")
let saveUser = document.getElementById("save")
let changePass = document.getElementById("changePass")
let bodyModal = document.getElementById("bodyModal")

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

addUser.addEventListener('click', function(){
  document.getElementById("userName").innerHTML = "Nuevo usuario"
  


  btnbajaUser.setAttribute("hidden",true) 
  btnProgramBaja.setAttribute("hidden",true) 
  btnActiveUser.setAttribute("hidden",true) 
  saveUser.setAttribute("hidden",true) 
  changePass.setAttribute("hidden",true) 

  let btnCreate = createBtn("Crear usuario", "btn btn-outline-success") 
  let btnPrg = createBtn("Programar alta", "btn btn-outline-warning") 

  btnPrg.addEventListener('click',function(){
    btnPrg.disabled = true
    let label = document.createElement("label")
    label.innerText = "Seleccione el día en el cual se hará efectivo el acceso al sistema."

    let labelEnd = document.createElement("label")
    labelEnd.innerText = "Opcional: Último que el usuario podrá acceder al sistema."
    bodyModal.appendChild(label)
    bodyModal.appendChild(createInput("start_at"))
    bodyModal.appendChild(labelEnd)
    bodyModal.appendChild(createInput("end_at"))
  })

  btnCreate.addEventListener('click',function(){
    let inputData = document.getElementsByName("inputData")
    let arr = {}

    inputData.forEach(element =>{
      if(element.value.length>=1){
        if(element.type == "date"){
          let change = element.value.replace("-","/").replace("-","/")
          
          if(myTest[element.id].test(change)){
            arr[element.id] = change
          }
        }
        if(myTest[element.id].test(element.value)){
          arr[element.id] = element.value
        }
      }
    })
    let bodyContent = JSON.stringify(arr)
    let url = domain + "/api/admin/"
    asyncApiRequest("POST",url, bodyContent).then(function(data){
      console.log(data)
    }).catch(function(error){
      console.log(error)
    })
  })

  buttonFooter.appendChild(btnCreate)
  buttonFooter.appendChild(btnPrg)

})

function createBtn(value, typeClass){
  let newBtn = document.createElement("button")
  newBtn.setAttribute("class",typeClass) 
  newBtn.innerText = value
  return newBtn
}

function createInput(id){
  let newInputData = document.createElement("input")
  newInputData.setAttribute("class","form-control")
  newInputData.setAttribute("data-provide","datepicker") 
  newInputData.setAttribute("name","inputData") 
  newInputData.setAttribute("type","date") 
  newInputData.setAttribute("id", id)

  return newInputData
}

let myTest = {
  "name" : patterName,
  "name_empresa" : patterName,
  "email" : patternMail,
  "start_at" : patternDate,
  "end_at" : patternDate
}