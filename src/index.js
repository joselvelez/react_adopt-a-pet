import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pet from './Pet';

const App = () => {
  const [pets, setPets] = useState([])
  const [ isLoading, setLoading ] = useState(false);

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
            <button>Add a Pet</button>
          </>
        )}
    </main>
  );
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);