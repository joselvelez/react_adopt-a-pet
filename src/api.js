const apiURL = 'http://localhost:3001/pets'

const handleErrors = async (res) => {
    try {
        const response = await res;
        return response;
    } catch(e) {
        console.log(error => {console.log(error);});
    }
}

export const listPets = async () => {
    const res = await fetch(apiURL);
    return await res.json();
}

export const createPet = async (pet) => {
    const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    });
    return await handleErrors(response.json());
}

// https://developer.mozilla.org/en-US/docs/Web/API/fetch