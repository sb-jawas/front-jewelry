export const domain = "http://localhost:8000";

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
