import React, { useState, useRef } from 'react'
import Modal from 'react-modal';

function EditPetModal({ onCancel, onSave, pet }) {
    const [ name, setName ] = useState(pet.name);
    const [ kind, setKind ] = useState(pet.kind);
    const [ photo, setPhoto ] = useState(pet.photo);
    const [ errors, setErrors ] = useState(null);
    const [ saving, setSaving ] = useState(false);
    const photoInput = useRef();

    const setPetPhoto = () => {
        const file = 
        photoInput.current.files &&
        photoInput.current.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => setPhoto(reader.result);
        }
    };

    const submit = event => {
        event.preventDefault();
        setSaving(true);
        onSave({
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
        <Modal isOpen={true} onRequestClose={onCancel}>
            <h2>Edit Pet Registration</h2>
            <form className="pet-form" onSubmit={submit}>
                {photo && <img alt="the pet" src={photo} />}

                <label htmlFor="photo">Photo</label>
                <input
                    type="file"
                    id="photo"
                    ref={photoInput}
                    onChange={setPetPhoto}
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
        </Modal>
    )
}

export default EditPetModal;
