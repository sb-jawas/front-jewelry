import { getLocalStorage, redirectToMyRol } from "../utils/funcs.js";
import { navbar } from "../utils/navbar.js";

let rolView = 1
redirectToMyRol(rolView)
navbar(getLocalStorage("userName"),"Colaborador")
