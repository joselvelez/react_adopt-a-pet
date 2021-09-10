import { React, useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import './index.css';
import NewPetModal from './NewPetModal';
import Pet from './Pet';
import { listPets, createPet } from './api';

const App = () => {
  const [pets, setPets] = useState([])
  const [ isLoading, setLoading ] = useState(false);
  const [ isNewPetOpen, setNewPetOpen ] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await listPets();
        setPets(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    getData();
  }, [])

  const addPet = async (pet) => {
    const newPet = await createPet(pet);
    setPets([
      ...pets,
      newPet
    ]);
    setNewPetOpen(false);
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
                  <Pet pet={pet} />
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

    </main>
  );
};
const el = document.querySelector('#root');
Modal.setAppElement(el);  // https://reactcommunity.org/react-modal/accessibility/
ReactDOM.render(<App />, el);

// React Modal Docs: http://reactcommunity.org/react-modal/