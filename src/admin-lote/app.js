
let btnRecoger = document.getElementById("btn-recoger")
let btnEntregar = document.getElementById("btn-entregar")
let checkRecoger = document.getElementById("check-allRecoger")
let checkEntregar = document.getElementById("check-allEntregar")

checkEntregar.addEventListener('change',function(){
    btnEntregar.removeAttribute("disabled")
    btnRecoger.setAttribute("disabled", true)
})


btnRecoger.addEventListener('click',function(){

})

btnEntregar.addEventListener('click',function(){

})