import { uploadImage } from "../http/user.js"
import { createList } from "../info-lote/clasificador.js"
import { asyncApiRequest, domain, getLocalStorage, sendNotification } from "../utils/funcs.js"

let btnSubmit = document.getElementById('btnSubmit')
let newImage = document.getElementById('newImage')
let image = document.getElementById('joyaImg')
let nameJoya = document.getElementById('nameJoya')
let descJoya = document.getElementById('desc')
let table = document.getElementById('table')
let selectComponentes = document.getElementById('componentes')

newImage.addEventListener('change', function(event){
    console.log(event.target.files)
    image.src =   URL.createObjectURL(newImage.files[0])
})

btnSubmit.addEventListener('click', function(){

    let bodyImage = new FormData();
    bodyImage.append("image", (newImage.files[0]))
    let url = domain + "/api/image"
    uploadImage("POST", url, bodyImage).then(function(resImage){
        let url = domain + "/api/joyas"
        let bodyContent = JSON.stringify({
            "user_id":getLocalStorage("userId"),
            "name": nameJoya.value,
            "desc": descJoya.value,
            "foto": resImage.url
        })

        asyncApiRequest("POST", url, bodyContent).then(function(data){
            table.hidden = false
            btnSubmit.remove()
            let url = domain + "/api/componentes"
            let comps = asyncApiRequest("GET", url).then(function(data){
                return data
            })
            let listaComp = createList(comps)
            
            let row = document.createElement('tr')
            row.appendChild(listaComp)
            table.appendChild(row)

            createTable(data)
        })
    })

})

function createTable(data) {
    let arr = ["componente", "cantidad"];
    let i = 0;
    let arrDatos = data;
  
    while (i < arrDatos.length) {
      const row = document.createElement("tr");

  
      let j = 0;
      while (j < arr.length) {
        const cell = document.createElement("td");
    
          const cellText = document.createTextNode(arrDatos[i][arr[j]]);
          cell.appendChild(cellText);
        
  
        row.appendChild(cell);
        j++;
      }
      document.getElementById("tbody").appendChild(row);
      i++;
    }
  }

