import * as React from 'react';
import { Modal, Box, Button, Typography, Grid, TextField } from '@mui/material';
import { wordsToString } from '../../helpers/word';
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

export default function ModalExportData({ open, handleClose, words }) {
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    if (open) {
      setData(wordsToString(words));
    }
  }, [open])


  const onCopy = () => {
    var input = document.getElementById('input-value-copy');
    input.select();
    try {
      document.execCommand('copy');
      alert('Đã sao chép!');
      // Ẩn thông báo sau 2 giây
    } catch (err) {
      alert('Lỗi sao chép:', err);
    }
  }
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" marginBottom={2} color='black' component="h2">
            Xuất dữ liệu
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="h6" color='gray' fontSize={13} component="h6">
                Sao chép văn bản trong ô sau đó gửi cho người khác để có thể thêm dữ liệu vào hệ thống
              </Typography>
            </Grid>
            <Grid size={9}>
              <TextField id='input-value-copy' size='small' fullWidth defaultValue={data} label="Dữ liệu" variant="outlined" />
            </Grid>
            <Grid size={3}>
              <Button variant='contained' onClick={onCopy} size="medium">Copy</Button>
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