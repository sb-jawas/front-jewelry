export const domain = "http://localhost:2222";

export async function asyncApiRequest(methodApi, url, bodyContent) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let response = await fetch(url, {
    method: methodApi,
    body: bodyContent,
    headers: headersList,
  });

  if (!response.ok) {
    let errorResponse = await response.json();
    throw new Error(JSON.stringify(errorResponse));
  } else {
    let data = await response.json();
    return data;
  }
}

export async function asyncMaps(methodApi, url) {
  let response = await fetch(url, {
    method: methodApi,
  });
  if (!response.ok) {
    let errorResponse = await response.json();
    throw new Error(JSON.stringify(errorResponse));
  } else {
    let data = await response.json();
    return data;
  }
}

export function formatDate(date) {
  let fecha = new Date(date);

  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let year = fecha.getFullYear();

  let fechaFormateada = dia + "/" + mes + "/" + year;
  return fechaFormateada;
}
export function formatDateWithTime(date) {
  var parseDate = new Date(date);

  let dia = addZero(parseDate.getDate());
  let mes = addZero(parseDate.getMonth() + 1);
  let year = parseDate.getFullYear();
  let horas = addZero(parseDate.getHours());
  let minutos = addZero(parseDate.getMinutes());
  let segundos = addZero(parseDate.getSeconds());

  let fechaFormateada = 
    dia +
    "/" +
    mes +
    "/" +
    year +
    " - " +
    horas +
    ":" +
    minutos +
    ":" +
    segundos;

  return fechaFormateada;
}

function addZero(numero) {
  return numero < 10 ? "0" + numero : numero;
}

export function sendNotification(message, type) {
  let notification = document.getElementById("notification");

  let getNoti = document.getElementById("noti");

  let newP = null;

  if (!getNoti) {
    newP = document.createElement("p");
    newP.setAttribute("id", "noti");
  } else {
    newP = getNoti;
  }
  notification.setAttribute("class", type);
  newP.innerHTML = `<i class="bi bi-info-circle-fill"></i> ` + message;
  notification.appendChild(newP);
}

export function testNotification(message) {
  let notification = document.getElementById("notification");
  let getNoti = document.createElement("div");
  getNoti.innerHTML = `<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>
    <strong class="me-auto">Alerta</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
   ${message}
  </div>
</div>`;
  notification.appendChild(getNoti);
}

export function switchThem() {
  let localTheme = localStorage.getItem("theme");
  document.body.setAttribute("data-bs-theme", localTheme);
}

export function changeMode(color) {
  localStorage.setItem("theme", color);
}

export function eliminarFila(id) {
  table.deleteRow(id);
}

export function switcherTheme() {
  let switcher = document.getElementById("switcher");

  switcher.addEventListener("change", function (event) {
    console.log(event.target.checked);
    // changeMode()
  });
}


export function createListCell(element) {
  const cell = document.createElement("td");
  cell.appendChild(element);
  return cell;
}

export function deleteButtons(){
  let buttons = document.getElementsByName("btn");
  for (var i = 0, len = buttons.length; i != len; ++i) {
    buttons[0].parentNode.removeChild(buttons[0]);
  }
}