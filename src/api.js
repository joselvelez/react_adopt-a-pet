const apiURL = 'http://localhost:3001/pets'

const handleErrors = res => {
    if (!res.ok) {
        return res.json().then(error => {
            throw error;
        })
    }
    return res.json();
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
    return handleErrors(response);
}

export const updatePet = async (pet) => {
    const response = await fetch(`${apiURL}/${pet.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    });
    return handleErrors(response);
}

export const deletePet = async (pet) => {
    const response = await fetch(`${apiURL}/${pet.id}`, {
        method: 'DELETE'
    });
    return handleErrors(response);
}

// https://developer.mozilla.org/en-US/docs/Web/API/fetch