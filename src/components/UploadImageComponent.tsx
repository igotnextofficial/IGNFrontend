import React, {useEffect, useState } from 'react';
import { TextField,  FormLabel } from '@mui/material';
import { useFileUploadContext } from '../contexts/FileUploadContext';
import FileUploadProvider from '../providers/FileUploadProvider';
import { useEditorFormContext } from '../contexts/EditorFormContext';


const UploadImageComponent = () => {
  const {updateData} = useEditorFormContext()
  const [uploadedFile,setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const ImageUploadDisplay = () => {
    const {selectedFiles,fileUrl,uploadFile} = useFileUploadContext()

  
    useEffect(() => {
        setPreviewUrl(fileUrl)
    },[uploadFile,fileUrl])

    const handleFileChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
        if (file) {
          updateData('image',file)
          setUploadedFile(file)
        } 
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