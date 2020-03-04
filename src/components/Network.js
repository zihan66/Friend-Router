export async function postRequest(address, data, header){
    try {
        const response = await fetch(address, {
            method:'POST',
            body: data,
            headers: header
        });
        return response.json()
    } catch (error) {
        console.error(error);
    }
}



