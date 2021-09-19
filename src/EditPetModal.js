import React from 'react'
import Modal from 'react-modal';
import PetForm from './PetForm';

function EditPetModal({ onCancel, onSave, pet }) {

    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
            <h2>Edit Pet Registration</h2>
            <PetForm pet={pet} onSave={onSave} onCancel={onCancel} />
        </Modal>
    )
}

export default EditPetModal;
