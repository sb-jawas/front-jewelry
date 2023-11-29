export const domain = "http://localhost:1234";

export async function asyncApiRequest(methodApi, url, bodyContent) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let response = await fetch(url, {
    method: methodApi,
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

export function formatDate(date) {
  let fecha = new Date(date);

  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let year = fecha.getFullYear();

  let fechaFormateada = dia + "/" + mes + "/" + year;
  return fechaFormateada;
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
  notification.appendChild(newP);
  newP.innerHTML = `<i class="bi bi-info-circle-fill"></i> ` + message;

}