import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useState} from 'react'
export default  function ALert(props) {
    const res = props.result ? 'success' : 'error';
  return (
    <div className='alert-container'>
    <Stack sx={{ width: '100%' }} spacing={2}>
 
      <Alert severity={`${res}`}>{props.title} </Alert>
    </Stack>
      </div>
  );
}
/*     <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert> */