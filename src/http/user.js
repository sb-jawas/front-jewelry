
export async function asyncUser(methodApi,url, bodyContent){ 
    let headersList = {
        "Content-Type": "application/json"
    };
    try{
        let response = await fetch(url, {
            method: methodApi,
            body: bodyContent,
            headers: headersList,
        });
        
        if(response.ok==400){
            return response.status
        }
        if (!response.ok) {
            let errorResponse = await response.text();
            return errorResponse
        } else {
            let data = await response.json();
            return data;
        }
    }catch(error){
        console.log(error)
    }
}

export async function loginUser(){

}