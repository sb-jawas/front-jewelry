import { getLocalStorage, redirectToMyRol } from "../utils/funcs.js";
import { navbar } from "../utils/navbar.js";

let rolView = 3
redirectToMyRol(rolView)
navbar(getLocalStorage("userName"),"Diseñador")
