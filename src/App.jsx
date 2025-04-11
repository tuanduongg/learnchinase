import * as React from 'react';
import './App.css'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import WordTable from './components/word_table/WordTable';
import RandomHanyu from './components/random_hanyu/RandomHanyu';
import RandomPinyn from './components/random_hanyu/RandomPinyn';
import { WORDS } from './configs/constants';
import HanyuVietNam from './components/random_hanyu/HanyuVietNam';
import VietNamHanyu from './components/random_hanyu/VietNamHanyu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '50%' }, marginX: 'auto' }}>
        <h1 >Học Tiếng Trung Cùng Tuấn Nha!</h1>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" fontWeight={'bold'}>Danh Sách Từ</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <WordTable words={words} setWords={setWords} getData={getDataFromLocalStorage} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight={'bold'}>Pinyin - Nhập chữ hán</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RandomHanyu words={words} />
          </AccordionDetails>
        </Accordion>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span" fontWeight={'bold'}>Hán ngữ - Nhập Việt Nam</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HanyuVietNam words={words} />
          </AccordionDetails>
        </Accordion>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography component="span" fontWeight={'bold'}>Việt Nam - Nhập Hán ngữ</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <VietNamHanyu words={words} />
          </AccordionDetails>
        </Accordion>
        <Box sx={{ textAlign: 'center', color: '#a1a1a1', marginY: 5 }}>Copyright © 2025 by
          <a href="https://www.facebook.com/toilatuann/" style={{marginLeft:3,color: '#a1a1a1'}} target="_blank" rel="noopener noreferrer">
             Dương Tuấn
          </a>
        </Box>
      </Box>
    </>
  )
}

export default App
