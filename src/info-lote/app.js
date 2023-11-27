import { domain, asyncApiRequest, formatDate } from "../utils/funcs.js";

const table = document.getElementById("table");
const tblBody = document.getElementById("tbody");


const btnClasificar = document.getElementById("btn-clasificar");
const btnTarde = document.getElementById("btn-tarde");
const btnRechazar = document.getElementById("btn-rechazar");

const asignCheck = document.getElementsByName("asign");

let ubi = document.getElementById("ubi")
let status = document.getElementById("status")
let infoLote = document.getElementById("info-lote")
let observation = document.getElementById("observation")
let trTable = document.getElementById("trTable")


let i = 1;
let url = domain+"/api/componentes"
let componentes = asyncApiRequest("GET",url).then(function(resComp){
  return resComp
})

let idLote = localStorage.getItem("loteId")
url = domain+"/api/lote/"+idLote
asyncApiRequest("GET",url).then(function(lote){
    infoLote.textContent = "Lote: " + lote.id
    ubi.textContent = "Ubicación: "+ lote.ubi 
    status.textContent = "Estado: "+  lote.status
    observation.textContent = "Observación: "+  lote.observation

    let userLocal = localStorage.getItem("userId")
    if(lote.user_id == userLocal){   
        let btnAdd = document.createElement("i")
        btnAdd.setAttribute("class","bi bi-clipboard-plus-fill btn btn-success")
        btnAdd.id = "add-component"
        let th = document.createElement("th")
        th.appendChild(btnAdd)
        trTable.appendChild(th)
        let addComponent = document.getElementById("add-component");
        listenerBtnAdd(addComponent)
    }else{
        let buttons = document.getElementsByName("btn")
        for (var i = 0, len = buttons.length; i != len; ++i) {
            buttons[0].parentNode.removeChild(buttons[0]);
        }
    }
})



function listenerBtnAdd(addComponent){
    addComponent.addEventListener("click", function () {
    
        let lista =  null
        if(i>2){
            lista = localStorage.getItem("lista-componentes")
            console.log(localStorage.getItem("lista-componentes"))
        }else{
    
            lista = createList(componentes)
        }
        
    
      let inputCantidad = document.createElement("input");
      inputCantidad.setAttribute("type", "number");
    
      let btnDelete = document.createElement("button");
      btnDelete.setAttribute("class", "btn btn-danger");
      btnDelete.setAttribute("name", "btnDelete");
    
    
      let icon = document.createElement("i");
      icon.setAttribute("class", "bi bi-trash3-fill");
      icon.setAttribute("name", "icoDelete");
    
      icon.setAttribute("id", i);
      btnDelete.setAttribute("id", i);
      i++;
    
      btnDelete.appendChild(icon);
      let groupBtnDelete = document.getElementsByName("btnDelete");
      let groupIcoDelete = document.getElementsByName("icoDelete");
    
      btnDelete.addEventListener("click", function (event) {
        
          let z = event.target.id;
          while (z < groupBtnDelete.length) {
            groupBtnDelete[z].id--;
            groupIcoDelete[z].id--;
            z++;
          }
    
        table.deleteRow(event.target.id);
    
        if(tblBody.childNodes.length == 0){
            btnClasificar.setAttribute("disabled",true)
        }
    
        i = z;
      });
    
      let arr = [lista, inputCantidad, btnDelete];
      addInsert(arr);
      let test = disableOptionList()
    });
}



function addInsert(elements) {
  const row = document.createElement("tr");
  let cell = null;
  let i = 0;
  while (i < elements.length) {
    cell = document.createElement("td");
    cell.appendChild(elements[i]);
    row.appendChild(cell);
    i++;
  }
  tblBody.appendChild(row);
}


function disableOptionList(){

    table.addEventListener('input',function(event){
        let i = 0
        while(i<event.target.length){
            if(event.target[i].selected){
                event.target[i].setAttribute("selected","true")
                event.target[i].setAttribute("disabled","true")
                btnClasificar.removeAttribute("disabled")
            }else{
                event.target[i].removeAttribute("disabled")
            }
            i++
        }
        console.log(event.target)
       return event.target
    })

}


function createList(componentes){

    let lista = document.createElement("select");
    lista.setAttribute("class","form-select")
    lista.setAttribute("id","lista-componentes")
    var option = document.createElement("option");
    option.text = "Seleciona un componente";
    option.setAttribute("disabled",true)
    option.setAttribute("selected",true)

    lista.appendChild(option);

    componentes.then(function(resArr){
        let j = 0    
        while(j<resArr.length){
            var option = document.createElement("option");
            option.id = resArr[j].id;
            option.text = `${resArr[j].name} - ${resArr[j].desc}`;
            option.name = "listaComponentes"
            lista.appendChild(option);
            j++
        }
    })
    return lista

}

btnClasificar.addEventListener('click',function(){

    console.log(tblBody.childNodes[0].childNodes[0])
    // let url = domain + "/api/"
    // asyncApiRequest("POST",)
})