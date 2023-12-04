import { cargarLote } from "../http/info-lote.js";
import { sendNotification } from "../utils/funcs.js";

const table = document.getElementById("table");


export function mainEmpresa(lote){
    if(lote.status_code == 5){
        cargarLote()
    }else{
        table.deleteTHead()
    }
}