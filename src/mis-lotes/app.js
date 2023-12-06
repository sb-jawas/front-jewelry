import { sendNotification } from "../utils/funcs.js";
import { mainClasificador } from "./clasificador.js";
import { mainColaborador } from "./colaborador.js";


let getRolLocal = localStorage.getItem("rolId");

switch (getRolLocal) {
  case "1":
  mainColaborador()
    
    break;
    case "2":
  mainClasificador()
    
    break;
  default:
    sendNotification("No tiene acceso a esta vista","alert alert-danger")
   break;
}