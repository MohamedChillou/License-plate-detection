import { useState } from 'react';
import { Box } from '@mui/material';
import ImageUpload from './ImageUpload';

function App() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <ImageUpload />
    </Box>
  );
}

export default App;
