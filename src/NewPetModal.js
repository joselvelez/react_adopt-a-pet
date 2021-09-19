import React from 'react'
import Modal from 'react-modal';
import PetForm from './PetForm';

function NewPetModal({ onCancel, onSave, pet }) {
    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
            <h2>New Pet Registration</h2>
            <PetForm pet={pet} onCancel={onCancel} onSave={onSave} />
        </Modal>
    )
}

export default NewPetModal;