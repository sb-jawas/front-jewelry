import { asyncApiRequest, domain, formatDateWithTime } from "../utils/funcs.js"
import { redirect } from "../utils/routes.js"

let tblBody = document.getElementById('tbody')
let url = domain + '/api/clasificador/lotes'
asyncApiRequest('GET',url).then(function(data){
createTable(data)
})

function createTable(data){
    let arr = ['id', 'empresa','created_at', 'status'];
    let i = 0
    while(i<data.length){
        let j = 0
        let row = document.createElement('tr')
        while(j<arr.length+1){
            let td = document.createElement('td')
            if(j<arr.length){
                if(j==2){
                    td.innerText = formatDateWithTime(data[i][arr[j]])
                }else{
                    td.innerText = data[i][arr[j]]
                }
            }else{
                let btn = document.createElement('input')
                btn.setAttribute('class', 'btn btn-primary')
                btn.setAttribute('type','submit')
                btn.setAttribute('value' ,'Ver lote')
                btn.setAttribute('id', data[i].id)
                td.appendChild(btn)
                btn.addEventListener('click', function(event){
                    let loteId = event.target.id
                    localStorage.setItem('loteId',loteId)
                    location.href = redirect['info-lote']
                })
            }
            row.appendChild(td)
            j++
        }
        tblBody.appendChild(row)
        i++
    }
}