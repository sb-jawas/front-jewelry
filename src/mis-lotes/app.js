import { getLocalStorage, sendNotification } from "../utils/funcs.js";
import { navbar } from "../utils/navbar.js";
import { mainClasificador } from "./clasificador.js";
import { mainColaborador } from "./colaborador.js";


let getRolLocal = localStorage.getItem("rolId");

switch (getRolLocal) {
  case "1":
  mainColaborador()
navbar(getLocalStorage("userName"),"Colaborador")

    
    break;
    case "2":
  mainClasificador()
navbar(getLocalStorage("userName"),"Clasificador")
    
    break;
  default:
    sendNotification("No tiene acceso a esta vista","alert alert-danger")
   break;
}