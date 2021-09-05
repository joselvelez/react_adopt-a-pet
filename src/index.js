import { React, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pet from './Pet';

const App = () => {
  const [pets, setPets] = useState()

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>
            <Pet pet={pet} />
          </li>
        ))}
      </ul>
      <button>Add a Pet</button>
    </main>
  );
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);