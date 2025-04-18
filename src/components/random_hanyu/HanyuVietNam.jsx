import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Stack,
  Grid
} from '@mui/material';
import { getRandomWords, NUM_RANDOM } from '../../helpers/word';

export default function HanyuVietNam({ words }) {

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState({});
  const [arrData, setArrData] = useState([]);


  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };
  useEffect(() => {
    const randomWords = getRandomWords(words, NUM_RANDOM);
    setArrData(randomWords);
  }, [words]);
  const checkAnswers = () => {
    const newResult = {};
    arrData.forEach(word => {
      const userAnswer = (answers[word.id] || '').trim().toLowerCase();
      const correct = word.meaning.trim().toLowerCase();
      newResult[word.id] = userAnswer === correct;
    });
    setResult(newResult);
  };

  const resetAnswers = () => {
    const randomWords = getRandomWords(words, NUM_RANDOM);
    setArrData(randomWords);
    setResult({});
    setAnswers({});
  }

  return (
    <>
          <Box mx="auto" mt={0}>
            <Stack spacing={2}>
              {arrData?.map(word => (
                <Paper
                  key={word?.id}
                  elevation={1}
                  sx={{ display: 'flex', alignItems: 'center', padding: 1 }}
                >
                  <Typography sx={{ width: '50%', fontSize: 20 }}>{word?.word}</Typography>
                  <TextField
                    label="Việt Nam"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={answers[word?.id] || ''}
                    onChange={e => handleChange(word?.id, e.target.value)}
                    sx={{ mx: 1 }}
                  />
                  {result[word?.id] !== undefined && (
                    <Typography color={result[word.id] ? 'success.main' : 'error.main'}>
                      {result[word.id] ? '✅' : '❌'}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Stack>

            <Grid container spacing={2}>
              <Grid size={6} >
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={resetAnswers}
                  sx={{ mt: 3 }}
                >
                  Làm mới
                </Button>

              </Grid>
              <Grid size={6} >

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={checkAnswers}
                  sx={{ mt: 3 }}
                >
                  Kiểm tra
                </Button>
              </Grid>
            </Grid>
          </Box>
      {/* <Card sx={{ width: '100%', marginTop: 1 }}>
        <CardContent>
        </CardContent>
        <CardActions>

        </CardActions>
      </Card> */}
    </>

  );
}
