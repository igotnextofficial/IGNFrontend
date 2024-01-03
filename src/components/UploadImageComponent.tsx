import React, { useEffect, useState } from 'react';
import {  Button, TextField,  FormLabel } from '@mui/material';
import { useFileUploadContext } from '../Contexts/FileUploadContext';
import FileUploadProvider from '../Providers/FileUploadProvider';
import { UploadFile } from '@mui/icons-material';


const UploadImageComponent = () => {
  const [uploadedFile,setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const ImageUploadDisplay = () => {
    const {selectedFiles,fileUrl,errors,uploadFile} = useFileUploadContext()

  
    useEffect(() => {
        setPreviewUrl(fileUrl)
    },[uploadFile])

    const handleFileChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
        if (file) {
          setUploadedFile(file)
        } 
      };
  
    const handleUpload = () => {
      // Code to handle the file upload
      // Example: You can send the 'selectedFile' to a server or process it as needed
    };
    return (
      <div>
      <FormLabel id="radio-buttons-group-label">Upload an image:</FormLabel>
     <TextField
       type="file"
       onChange={handleFileChange}
       inputProps={{ accept: 'image/*' }} // Accept only images
     />
       {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
   {selectedFiles && (
     <div>
       {uploadedFile&& <p>Filename: {uploadedFile.name}</p>}

       {/* <Button variant="contained" color="primary" onClick={handleUpload}>
         Upload
       </Button> */}
     </div>
   )}
   </div>
    )
  }
      return (
    
        <FileUploadProvider myFile={uploadedFile}>
          <ImageUploadDisplay/>
        </FileUploadProvider>
       
      );

}

export default UploadImageComponent