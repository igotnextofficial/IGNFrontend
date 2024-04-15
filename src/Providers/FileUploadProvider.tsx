// Define the props type for the provider component
import { ReactNode, useEffect, useState } from "react";
import { FileUploadContext } from "../Contexts/FileUploadContext";
import { ValidFileTypes }from "../Types/DataTypes";
import { AudioMediaSource, ImageMediaSource, VideoMediaSource } from "../Models/Media";
import { Media }  from "../Models/Media";

  interface FileUploadProviderProps {
    children:ReactNode,
    myFile: File | null
  }


  
  const getFileType = (filename = "") => {
    const position = filename.indexOf('.')
    const fileType = filename.slice(position + 1);
    return  fileType
}


  const uploadFile = (file:File) => {

    const imageTypes = [ValidFileTypes.JPEG,ValidFileTypes.JPG]
    const audioTypes = [ValidFileTypes.MP3]
    const videoTypes = [ValidFileTypes.MP4]

    
    let filetype = getFileType(file.name)

    if (imageTypes.includes(filetype as ValidFileTypes)) {
        return new ImageMediaSource(file);
    }
    else if(audioTypes.includes(filetype as ValidFileTypes)){
        return new AudioMediaSource(file) 
    }
    else if(videoTypes.includes(filetype as ValidFileTypes)){
        return new VideoMediaSource(file)
    }
    else {
       return null
    }
}

const validateFile = (mediaSource:Media)=>{
    let validFileName = isValidFileName(mediaSource);
    let validFileSize = isValidFileSize(mediaSource);
    let validFileType = isValidFileType(mediaSource);
     if( validFileName && validFileSize  && validFileType){
        return true;
    }
    else {
       return `
        The file has failed 
         Filename meets requirements: ${validFileName}
         Filesize meets requirements: ${validFileSize}
         Filetype meets requirements: ${validFileType}
        `
        
    }
}

const isValidFileType = (mediaSource:Media) => {
    return mediaSource ? mediaSource.isValidFileType() : false
}
const isValidFileSize = (mediaSource:Media) => {
    return mediaSource ? mediaSource.isValidFileSize() : false
}
const isValidFileName = (mediaSource:Media) => {
    return mediaSource ? mediaSource.isValidFileName() : false
}


  const FileUploadProvider: React.FC<FileUploadProviderProps> = ( { children,myFile } )  => {
    const [selectedFiles,setSelectedFiles] = useState<File | null>(null);
    const [fileUrl,setFileUrl] = useState("")
    const [ignore,setIgnore] = useState(true);
    const [mediaSource,setMediaSource] = useState<Media| null>(null)
    const [Errors,setErrors] = useState("")


   
    
    useEffect(() => {

        if(myFile){
            const successfulUpload = uploadFile(myFile)
            if(successfulUpload !== null){
                setMediaSource(successfulUpload)
                setSelectedFiles(myFile)
            }
            else{
                setErrors("Issue with creating file")
            }
      
        }

        

    },[myFile])

    useEffect( () => {
        if(!ignore && mediaSource !== null){
            const validFile = validateFile(mediaSource)
            if(validFile){
                if(selectedFiles ){
                    setFileUrl(URL.createObjectURL(selectedFiles))
                }
            }
            else{
                setErrors(validFile)
            }
        }
       
       return () => {
            setIgnore(true)
                URL.revokeObjectURL(fileUrl);
         }
    },[ selectedFiles,fileUrl,ignore,mediaSource ])


   

  
    return(
    <FileUploadContext.Provider value={{selectedFiles:selectedFiles,fileUrl:fileUrl,uploadFile:uploadFile,errors:Errors}}>
        { children }
    </FileUploadContext.Provider>
    )
  }

  export default FileUploadProvider;