import { useEffect, useState } from 'react'
import './App.css'

const startWord = 'word';
const endWord = 'search';

interface WordItem {
  word: string;
}

function App() {
  const [curWord, setCurWord] = useState(startWord);
  const [words, setWords] = useState<WordItem[]>([]);
  const [wordArr, setWordArr] = useState<string[]>(['word']);
  const [guess, setGuess] = useState('');

  useEffect(() => {
    fetch(`http://api.datamuse.com/words?ml=${curWord}`).then(res => res.json()).then(setWords);
  }, [curWord]);
  
  const handleButtonClick = () => {
    if (wordArr.includes(guess)) return;

    if (words.some(item => item.word === guess)) {
      setCurWord(guess);
      setWordArr(prevArr => [...prevArr, guess]);
    }
  };

  return (
    <div>
      <h1>Try to search from {startWord} to {endWord}</h1>
      <input 
        type="text"  
        placeholder="Search"
        value={guess} 
        onChange={(e) => setGuess(e.target.value)} 
      />
    
      <button onClick={handleButtonClick}> Submit your search </button>
      <ul>
        { wordArr.map((word,idx) => <li key={idx}> {word}</li>)}
      </ul>

      { curWord === endWord ? 'You win!' : '' }
      { wordArr.includes(guess) ? `You have searched ${guess}.` : ''}
    </div>
  );
}

export default App;
