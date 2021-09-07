import { React, useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import './index.css';
import NewPetModal from './NewPetModal';
import Pet from './Pet';

const App = () => {
  const [pets, setPets] = useState([])
  const [ isLoading, setLoading ] = useState(false);
  const [ isNewPetOpen, setNewPetOpen ] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/pets');
        const pets = await res.json();
        setPets(pets);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    getData();
  }, [])

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
          />
        )}

    </main>
  );
};
const el = document.querySelector('#root');
Modal.setAppElement(el);  // https://reactcommunity.org/react-modal/accessibility/
ReactDOM.render(<App />, el);

// React Modal Docs: http://reactcommunity.org/react-modal/