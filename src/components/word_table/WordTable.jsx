import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, Box, IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAddNew from './ModalAddNew';
import { WORDS } from '../../configs/constants';
import ModalExportData from './ModalExportData';


export default function WordTable({ words, getData, setWords }) {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalExport, setOpenModalExport] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedWords, setPaginatedWords] = useState([]);



  useEffect(() => {
    // if (words && words?.length > 0) {
    const wordArr = words ? words?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
    setPaginatedWords(wordArr)
    // }
  }, [words, page, rowsPerPage])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (word) => {
    let text = 'Bạn muốn xóa từ này?';
    if (confirm(text) == true) {
      const wordsFilter = words.filter(item => item?.id !== word?.id);

      localStorage.setItem(WORDS, JSON.stringify(wordsFilter));
      setWords(wordsFilter)
    }
    // bạn có thể xóa khỏi danh sách hoặc confirm xóa
  };
  const onClickAdd = () => {
    setOpenModalAdd(true);
  }

  const onCloseModalAdd = () => {
    setOpenModalAdd(false);
  }
  const onClickExportData = () => {
    setOpenModalExport(true);

  }
  const afterSave = () => {
    getData();
    alert('Thành công!');
  }

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontWeight="bold">Tổng: {words?.length || '0'} từ</Typography>
            <Stack flexDirection={'row'}>
              <Button variant='outlined' sx={{ marginRight: '5px' }} onClick={onClickExportData} size="small">Xuất dữ liệu</Button>
              <Button variant='contained' onClick={onClickAdd} size="small">Thêm mới</Button>
            </Stack>
          </Box>
          <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: '55px' }}><strong>Từ Hán</strong></TableCell>
                    <TableCell sx={{ minWidth: '55px' }}><strong>Pinyin</strong></TableCell>
                    <TableCell sx={{ minWidth: '55px' }} align='center'><strong>Nghĩa</strong></TableCell>
                    <TableCell align='right'><strong>Xóa</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedWords.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 20 }}>{item?.word}</TableCell>
                      <TableCell>{item?.pinyin}</TableCell>
                      <TableCell align='center'>{item?.meaning}</TableCell>
                      <TableCell align='right'>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <IconButton color="error" onClick={() => handleDelete(item)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
        <CardActions>
          <Box display={'flex'} width={'100%'} justifyContent={'end'}>
            <TablePagination
              component="div"
              count={words?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Từ/trang"
              rowsPerPageOptions={[5, 10, 20]}
            />
          </Box>
        </CardActions>
      </Card>
      <ModalAddNew open={openModalAdd} handleClose={onCloseModalAdd} afterSave={afterSave} />
      <ModalExportData open={openModalExport} words={words}  handleClose={() => { setOpenModalExport(false) }} />

    </>

  );
}
