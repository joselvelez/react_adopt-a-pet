const uri = 'http://localhost:3001/pets'

const handleErrors = async (res) => {
    if (!res.ok) {
        const errResponse = res.json();
        return await errResponse;
    }
    return await res.json();
}

export const listPets = async () => {
    const res = await fetch(uri);
    return await res.json();
}

export const createPet = async (pet) => {
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    });

    handleErrors(res);
}

// https://developer.mozilla.org/en-US/docs/Web/API/fetch