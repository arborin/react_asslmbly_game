import { useEffect, useState } from 'react';
import './App.css';
import { languages } from './data/languages';
import { words } from './data/words';
import Button from './components/Button';
import { clsx } from 'clsx';
import { getFarewellText } from './utils';
import Confetti from 'react-confetti'

function App() {

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const message = "Guess the word 🧐"

  const [bgstatus, setStatus] = useState('start')
  const [topText, setTopText] = useState(message)
  const [bottomText, setBottomTopText] = useState()

  const [langs] = useState(languages)
  const [guessLetter, setGuessLetter] = useState([])

  const [currentWord, setCurrentWord] = useState(() => getWord())

  const wrongGuessesArray = guessLetter.filter(letter => !currentWord.includes(letter))

  const wrongGuessCount = wrongGuessesArray.length


  const isGameWon = currentWord.split("").every(letter => guessLetter.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length
  const isGameOver = isGameWon || isGameLost



  function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    console.log(word)
    return word

  }


  function startNewGame() {
    setCurrentWord(getWord())
    setGuessLetter([])
    setStatus('start')
    setTopText(message)
    console.log("start new game")
  }


  useEffect(() => {
    setBottomTopText(`You have ${langs.length - wrongGuessCount} attempts left`)
  }, [wrongGuessCount, langs])




  useEffect(() => {
    if (isGameWon) {
      setStatus('success')
      setTopText('Winner!')
    }
    if (isGameLost) {
      setStatus('game-over')
      setTopText('Game Over!')
      setBottomTopText('')
    }
  }, [isGameWon, isGameLost])





  // const [wrongGuess, setWrongGuess] = useState(0);

  const word = currentWord.toUpperCase().split("").map((letter, index) => {
    return <span key={index}>
      {guessLetter.includes(letter.toLocaleLowerCase()) ? letter : " "}
    </span>

  })

  const guessWord = currentWord.toUpperCase().split("").map((letter, index) => {
    return <span key={index}>{letter.toUpperCase()}</span>

  })

  const letterBtns = alphabet.split("").map((letter, index) => {
    const isGuessed = guessLetter.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return <button className={className} key={index} disabled={isGameOver} onClick={() => getLetter(letter)}>{letter.toUpperCase()}</button>
  })


  const getLetter = (letter) => {
    if (!currentWord.includes(letter)) {

      if (wrongGuessCount >= 0 && wrongGuessCount < languages.length) {
        const msg = getFarewellText(languages[wrongGuessCount]['name'])
        setTopText(msg)
      }

    }
    setGuessLetter((prev) => guessLetter.includes(letter) ? prev : [...guessLetter, letter])
  }



  return (
    <div className="App">
      {isGameWon && <Confetti recycle={false}
        numberOfPieces={1000} />}
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
          {
            langs.map((item, id) => {
              const lost = id < wrongGuessesArray.length ? 'lost' : ''
              return <Button lost={lost} key={id} name={item.name} backgroundColor={item.backgroundColor} color={item.color} />
            })
          }
        </section>
        <section className='word'>
          {isGameLost ? guessWord : word}

        </section>
        <section className='keyboard'>
          {letterBtns}
        </section>
        <footer>
          {isGameOver && <button onClick={startNewGame}>New Game</button>}
        </footer>
      </main>
    </div >
  );
}

export default App;
