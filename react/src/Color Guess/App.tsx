import { useState } from 'react'
import './App.css'
import { shuffle, getRandomHex } from './Utils';

function App() {
  const [streak, setStreak] = useState(0);
  const [prevHex, setPrevHex] = useState('');
  const [guess, setGuess] = useState('');
  const [hex, setHex] = useState(getRandomHex);

  const optionSet = new Set([hex]);
  while (optionSet.size != 3)
    optionSet.add(getRandomHex())

  const options = shuffle([...optionSet]);

  const handleClick = (guess: string) => {
    if (guess === hex) {
      setStreak(streak => streak + 1);
    } else {
      setStreak(0);
    }

    setGuess(guess);
    setPrevHex(hex);
    setHex(getRandomHex());
  }

  const isCorrectGuess = guess === prevHex;
  const verdictText1 = `Answer ${guess} is ${isCorrectGuess ? 'correct!' : 'wrong.'}`;
  const verdictText2 = isCorrectGuess ? '' : `Correct answer is ${hex}.`
  const className = isCorrectGuess ? 'guess-correct' : 'guess-wrong';
  
  return (
    <main>
      <div className="color-block" style={{ backgroundColor: `${hex}`}}></div>
      <ul>
        <li>
          {options.map((item: string) => (
            <button onClick={() => handleClick(item)} key={item}>{item}</button>
          ))}
        </li>
      </ul>

      <span className='streak-text'>Streak: {streak} </span>
      { guess != '' && <span className={`verdict-text ${className}`}> {verdictText1} </span> }
      { guess != '' && !isCorrectGuess && 
          <>
            <span className='wrong-answer' style={{ backgroundColor: `${prevHex}`}}></span>
            <span className={`verdict-text ${className}`}> {verdictText2} </span>
            <span className='correct-answer' style={{ backgroundColor: `${guess}`}}></span>
          </>
      }
    </main>
  )
}

export default App;
