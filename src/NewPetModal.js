import React, { useState, useRef } from 'react'
import Modal from 'react-modal';

function NewPetModal({ onCancel, onSave }) {
    const [ name, setName ] = useState('');
    const [ kind, setKind ] = useState('');
    const [ photo, setPhoto ] = useState(null)
    const photoInput = useRef();

    const setPetPhoto = () => {
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
        // save
        onSave({
            name,
            kind,
            photo
        });
    }

    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
            <h2>New Pet Registration</h2>
            <form className="pet-form" onSubmit={submit}>
                {photo && <img alt="the pet" src={photo} />}

                <label htmlFor="photo">Photo</label>
                <input
                    type="file"
                    id="photo"
                    ref={photoInput}
                    onChange={setPetPhoto}
                />

                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

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

                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit">Save</button>
            </form>
        </Modal>
    )
}

export default NewPetModal;
