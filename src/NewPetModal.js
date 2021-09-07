import React, { useState } from 'react'
import Modal from 'react-modal';

function NewPetModal({ onCancel }) {
    const [ name, setName ] = useState('');
    const [ kind, setKind ] = useState('');

    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
            <h2>New Pet Registration</h2>
            <form className="pet-form">
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
