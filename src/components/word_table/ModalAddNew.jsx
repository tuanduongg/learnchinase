import * as React from 'react';
import { Modal, Box, Button, Typography, Grid, TextField } from '@mui/material';
import { pushArrayToLocalStorage } from '../../helpers/localstorage';
import { v4 as uuidv4 } from 'uuid';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ModalAddNew({ open, handleClose, afterSave }) {
  const [hanWord, setHanWord] = React.useState('');
  const [pinyinWord, setPinyinWord] = React.useState('');
  const [multiple, setMultiple] = React.useState('');
  const [translateWord, setTranslateWord] = React.useState('');

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'multiple':
        setMultiple(value);
        break;
      case 'hanWord':
        setHanWord(value);
        break;
      case 'pinyinWord':

        setPinyinWord(value);
        break;
      case 'translateWord':
        setTranslateWord(value)
        break;

      default:
        break;
    }
  }
  const onClickSaveMultiple = () => {
    try {
      if (multiple) {
        //你好:nǐ hǎo:xin chào;谢谢:xièxie:cảm ơn;
        const arr = multiple.split(';');
        if (arr?.length > 0) {
          const data = [];
          arr.map(item => {
            const arrSence = item.split(':');
            if (arrSence?.length === 3) {
              data.push({ id: uuidv4(), word: arrSence[0], pinyin: arrSence[1], meaning: arrSence[2] });
            }
          });
          pushArrayToLocalStorage(data);
          setMultiple('');
          afterSave();
        }
  
      }
      
    } catch (error) {
      alert(error)
    }
  }
  const onClickSave = () => {
    if (hanWord && pinyinWord && translateWord) {
      pushArrayToLocalStorage([{ id: uuidv4(), word: hanWord, pinyin: pinyinWord, meaning: translateWord }])
      afterSave();
      handleClickReset();
    }
  }
  const handleClickReset = () => {
    setHanWord('');
    setPinyinWord('');
    setTranslateWord('');
  }
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" marginBottom={2} component="h2">
            Thêm Từ Mới
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField size='small' onChange={onChangeInput} name='hanWord' value={hanWord} fullWidth placeholder="Từ hán" label="Từ hán" variant="outlined" />
            </Grid>
            <Grid size={12}>
              <TextField size='small' onChange={onChangeInput} name='pinyinWord' fullWidth value={pinyinWord} placeholder="Pinyin" label="Pinyin" variant="outlined" />
            </Grid>
            <Grid size={12}>
              <TextField size='small' onChange={onChangeInput} name='translateWord' fullWidth value={translateWord} placeholder="Nghĩa" label="Nghĩa" variant="outlined" />
            </Grid>
            <Grid size={12} display={'flex'} justifyContent={'flex-end'}>
              <Button variant='outlined' onClick={handleClickReset} size="small">Reset</Button>
              <Button variant='contained' sx={{ marginLeft: 2 }} onClick={onClickSave} size="small">Lưu thông tin</Button>
            </Grid>
          </Grid>
          <Typography variant="h6" marginY={2} component="h2">
            Thêm Nhiều Từ Mới
          </Typography>
          <p>Dán theo cấu trúc Từ Hán:Pinyin:NghĩaTiếngViệt;</p>
          <p>Ví dụ:你好:nǐ hǎo:xin chào;谢谢:xièxie:cảm ơn;</p>
          <Grid container spacing={2}>
            <Grid size={9}>
              <TextField size='small' name='multiple' onChange={onChangeInput} fullWidth value={multiple} placeholder="你好:nǐ hǎo:xin chào;谢谢:xièxie:cảm ơn;" label="Dán vào đây" variant="outlined" />
            </Grid>
            <Grid size={3}>
              <Button variant='contained' onClick={onClickSaveMultiple} fullWidth size="medium">Lưu</Button>
            </Grid>
          </Grid>
          <Box marginTop={3} display={'flex'} justifyContent={'flex-end'}>

            <Button variant='outlined' sx={{ marginLeft: 2 }} onClick={handleClose} size="small">Đóng</Button>
          </Box>

        </Box>
      </Modal>
    </div>
  );
}
