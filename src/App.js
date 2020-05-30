import './App.css';

import * as axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [requestStatus, setRequestStatus] = useState('idle');

  const testCode = () => {
    axios({
      method: 'get',
      url: `http://localhost:3001/validate?secret=${code}`,
      responseType: 'json',
    })
      .then((response) => {
        const res = response.data.result;

        setResult(res);
        setRequestStatus('success');
      })
      .catch((e) => {
        setRequestStatus('error');
      });
  };

  const initGame = () => {
    axios({
      method: 'get',
      url: `http://localhost:3001/initilize`,
      responseType: 'json',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getResult = () => {
    if (requestStatus !== 'success') {
      return null;
    }

    return <div id='code-result'>Resultado: {result}</div>;
  };

  return (
    <div className='App'>
      <label>
        Ingrese el código:
        <input
          type='text'
          id='code-input'
          name='code'
          value={code}
          onChange={({ target: { value } }) => {
            setCode(value);
          }}
        />
      </label>
      <button id='test-code-btn' onClick={testCode}>
        Probar código
      </button>
      <button onClick={initGame}>Inicializar juego</button>

      {getResult()}
    </div>
  );
}

export default App;
