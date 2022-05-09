import { forwardRef } from 'react'
import TextField from '@mui/material/TextField';


const phoneInput = (props, ref) => (
    <TextField
      {...props}
      
      inputRef={ref}
      fullWidth
    //   size='small'
      label='Phone Number'
      variant='outlined'
      name='phone'
      
    />
  );
export default forwardRef(phoneInput)
