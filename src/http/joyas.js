export async function uploadImage(methodApi, url,bodyContent){
    let headersList = {
        "Authorization" : "Bearer " + getUserToken()
      };
      try{

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
        }catch(error){
            console.log(error)
        }
}