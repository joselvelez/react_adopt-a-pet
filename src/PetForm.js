import React, { useState, useRef } from 'react';

const PetForm = ({ pet, onCancel, onSave }) => {
    const initialPet = pet || {
        name: '',
        kind: '',
        photo: null
    };
    const [ name, setName ] = useState(initialPet.name);
    const [ kind, setKind ] = useState(initialPet.kind);
    const [ photo, setPhoto ] = useState(initialPet.photo);
    const [ errors, setErrors ] = useState(null);
    const [ saving, setSaving ] = useState(false);
    const photoInput = useRef();

    const updatePhoto = () => {
        const file = 
        photoInput.current.files &&
        photoInput.current.files[0];

        if (file) {
            // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => setPhoto(reader.result);
        }
    };

    const submit = event => {
        event.preventDefault();
        setSaving(true);
        onSave({
            ...pet,
            name,
            kind,
            photo
        }).catch(error => {
            console.log(`ERROR @ submit(): ${error.name}, ${error.kind}`);
            setErrors(error);
            setSaving(false);
        });
    }

    return (
        <form className="pet-form" onSubmit={submit}>
            {photo && <img alt="the pet" src={photo} />}

            <label htmlFor="photo">Photo</label>
            <input
                type="file"
                id="photo"
                ref={photoInput}
                onChange={updatePhoto}
            />

            {errors && errors.name && (
                <div className="error">{errors.name}</div>
            )}

            <label htmlFor="name">Name</label>
            <input 
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            {errors && errors.kind && (
                <div className="error">{errors.kind}</div>
            )}

            <label htmlFor="kind">Kind</label>
            <select
                name="kind"
                id="kind"
                value={kind}
                onChange={e => setKind(e.target.value)}
            >
                <option value="">select a kind</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select>

            <button disabled={saving} type="button" onClick={onCancel}>
                Cancel
            </button>
            <button disabled={saving} type="submit">Save</button>
        </form>
    )
};

export default PetForm;