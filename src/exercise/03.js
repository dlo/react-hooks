/* eslint-disable react/prop-types */

import * as React from 'react';

const Name = ({ name, onNameChange }) => (
  <div>
    <label htmlFor='name'>Name: </label>
    <input id='name' value={name} onChange={onNameChange} />
  </div>
);

const FavoriteAnimal = ({ name, onAnimalChange }) => {
  return (
    <div>
      <label htmlFor='animal'>Favorite Animal: </label>
      <input
        id='animal'
        value={name}
        onChange={(event) => onAnimalChange(event.target.value)}
      />
    </div>
  );
};

// 🐨 uncomment this

const Display = ({ name, animal }) => {
  return (
    <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
  );
};

const App = () => {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  return (
    <form>
      <Name
        name={name}
        onNameChange={(event) => setName(event.target.value)}
      />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal name={animal} onAnimalChange={setAnimal} />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} animal={animal} />
    </form>
  );
};

export default App;
