import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Typography } from '@mui/material';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Make a POST request to the server using Axios
      const response = await axios.post('http://localhost:8000/api/addUser', formData, {
        headers: {
          'Content-Type': 'text',
        },
      });
      if (response.status === 200) {
        // Assuming you have an img element with id="uploadedImage" in your HTML
        const imgElement: any = document.getElementById('img');
        // const imageUrl = window.URL.createObjectURL(response.data);
        imgElement.src = response.data;
      }
    } catch (error: any) {
      // Handle errors
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <Box display={'flex'} sx={{ flexDirection: 'column', m: 5 }}>
      <Box sx={{ display: 'flex', mb: 3 }}>
        <Typography variant='h3'>Object Detection using </Typography>
        <Typography variant='h3' sx={{ ml: 1 }} color={'#FB8B24'}>
          YOLO
        </Typography>
      </Box>
      <Box width={'100%'} height={'500px'} border={'solid 1px #262A56'}>
        <img id='img' src='1.png' width={'100%'} height={'100%'} />
      </Box>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Input type='file' onChange={handleFileChange} sx={{ color: '#FB8B24' }} />
        <Button variant='contained' sx={{ color: '#000', bgcolor: '#FB8B24' }} onClick={handleUpload} disabled={!selectedFile}>
          Upload Image
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUpload;
