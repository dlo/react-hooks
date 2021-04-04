/* eslint-disable react/prop-types */

import * as React from 'react';

interface AnimalProps {
  name: string;
  onAnimalChange: (animalName: string) => void;
}

interface DisplayProps {
  animal: string;
}

const Name: React.FC<{}> = () => {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor='name'>Name: </label>
      <input
        id='name'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
  );
};

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

const Display: React.FC<DisplayProps> = ({ animal }) => {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
};

const App = () => {
  const [animal, setAnimal] = React.useState('');

  return (
    <form>
      <Name />
      <FavoriteAnimal name={animal} onAnimalChange={setAnimal} />
      <Display animal={animal} />
    </form>
  );
};

export default App;
