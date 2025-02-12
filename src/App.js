import { useState } from 'react';
import './App.css';

function App() {

  const [bgstatus, setStatus] = useState('start')
  const [topText, setTopText] = useState('Firewall html css')
  const [bottomText, bottomTopText] = useState()



  return (
    <div className="App">
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word within 8 attempts to keep the
            programming world safe from Assembly!</p>
        </header>
        <section className={'status ' + bgstatus}>
          {topText && <h1>{topText}</h1>}
          {bottomText && <p>{bottomText}</p>}
        </section>
        <section className='buttons'>
          <button>1</button>
          <button>1</button>
          <button>1</button>
          <button>1</button>
          <button>1</button>
          <button>1</button>
          <button>1</button>
          <button>1</button>
          <button>1</button>
        </section>
      </main>
    </div >
  );
}

export default App;
