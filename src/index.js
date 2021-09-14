import { React, useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import './index.css';
import NewPetModal from './NewPetModal';
import EditPetModal from './EditPetModal';
import Pet from './Pet';
import { listPets, createPet, updatePet } from './api';

const App = () => {
  const [ pets, setPets] = useState([])
  const [ isLoading, setLoading ] = useState(false);
  const [ isNewPetOpen, setNewPetOpen ] = useState(false);
  const [ currentPet, setCurrentPet ] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await listPets();
        setPets(response);
        setLoading(false);
      } catch (e) {
        console.log(`ERROR @ useEffect for setPets() & setLoading: ${e}`);
        setLoading(false);
      }
    }
    getData();
  }, [])

  const addPet = async (pet) => {
    const newPet = await createPet(pet);
    setPets([...pets, newPet]);
    setNewPetOpen(false);
  };

  const savePet = async (pet) => {
    return updatePet(pet).then(updatedPet => {
      setPets(pets =>
        pets.map(pet => {
          pet.id === updatedPet.id ? {
            ...pet,
            name: updatedPet.name,
            kind: updatedPet.kind,
            photo: updatedPet.photo
          } :
          pet
        })
      )
      });
  };

  return (
    <main>
      <h1>Adopt-a-Pet</h1>

      {isLoading ? (
        <div className="loading">Loading...</div>
        ) : (
          <>
            <ul>
              {pets.map(pet => (
                <li key={pet.id}>
                  <Pet pet={pet} onEdit={() => setCurrentPet(pet)} />
                </li>
              ))}
            </ul>
            <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
          </>
        )}

        {isNewPetOpen && (
          <NewPetModal
            onCancel={() => setNewPetOpen(false)}
            onSave={addPet}
          />
        )}

        {currentPet && (
          <EditPetModal
            pet={currentPet}
            onCancel={() => setCurrentPet(null)}
            onSave={savePet}
          />
        )}

    </main>
  );
};
const el = document.querySelector('#root');
Modal.setAppElement(el);  // https://reactcommunity.org/react-modal/accessibility/
ReactDOM.render(<App />, el);

// React Modal Docs: http://reactcommunity.org/react-modal/