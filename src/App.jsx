import * as React from 'react';
import './App.css'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import WordTable from './components/word_table/WordTable';
import RandomHanyu from './components/random_hanyu/RandomHanyu';
import RandomPinyn from './components/random_hanyu/RandomPinyn';
import { WORDS } from './configs/constants';
import HanyuVietNam from './components/random_hanyu/HanyuVietNam';
import VietNamHanyu from './components/random_hanyu/VietNamHanyu';

function App() {
  const [words, setWords] = React.useState([]);

  React.useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  const getDataFromLocalStorage = () => {
    const stored = localStorage.getItem(WORDS);
    if (stored) {
      setWords(JSON.parse(stored));
    }
  }
  console.log('words',words);
  
  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '50%' }, marginX: 'auto' }}>
        <WordTable words={words} setWords={setWords} getData={getDataFromLocalStorage}/>
        <RandomHanyu words={words} />
        <HanyuVietNam words={words} />
        <VietNamHanyu words={words} />
        <RandomPinyn words={words} />
      </Box>
    </>
  )
}

export default App
