// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = React.useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(key)) || defaultValue;
    } catch (e) {
      window.localStorage.removeItem(key);
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const Greeting = ({ initialName = '' }) => {
  const [name, setName] = useLocalStorageState('name', initialName);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor='name'>Name: </label>
        <input value={name} onChange={handleChange} id='name' />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
};

function App() {
  return <Greeting />;
}

export default App;
