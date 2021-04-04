/* eslint-disable react/prop-types */

import { ChangeEventHandler } from 'react';
import * as React from 'react';

interface NameProps {
  name: string;
  onNameChange: ChangeEventHandler<HTMLInputElement>;
}

interface AnimalProps {
  name: string;
  onAnimalChange: (animalName: string) => void;
}

interface DisplayProps {
  name: string;
  animal: string;
}

const Name: React.FC<NameProps> = ({ name, onNameChange }) => (
  <div>
    <label htmlFor='name'>Name: </label>
    <input id='name' value={name} onChange={onNameChange} />
  </div>
);

const FavoriteAnimal: React.FC<AnimalProps> = ({
  name,
  onAnimalChange,
}) => {
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

const Display: React.FC<DisplayProps> = ({ name, animal }) => {
  return (
    <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
  );
};

const App = () => {
  const [name, setName] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  return (
    <form>
      <Name
        name={name}
        onNameChange={(event) => setName(event.target.value)}
      />
      <FavoriteAnimal name={animal} onAnimalChange={setAnimal} />
      <Display name={name} animal={animal} />
    </form>
  );
};

export default App;
