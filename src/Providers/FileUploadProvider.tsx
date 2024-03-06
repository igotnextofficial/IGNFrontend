// Define the props type for the provider component
import { ReactNode, useEffect, useState } from "react";
import { FileUploadContext } from "../Contexts/FileUploadContext";
import { ValidFileTypes }from "../Types/DataTypes";
import { AudioMediaSource, ImageMediaSource, VideoMediaSource } from "../Models/Media";
import { Media }  from "../Models/Media";
import { sliderClasses } from "@mui/material";
import { error } from "console";

  interface FileUploadProviderProps {
    children:ReactNode,
    myFile: File | null
  }

  const FileUploadProvider: React.FC<FileUploadProviderProps> = ( { children,myFile } )  => {
    const [selectedFiles,setSelectedFiles] = useState<File | null>(null);
    const [fileUrl,setFileUrl] = useState("")
    const [ignore,setIgnore] = useState(true);
    const [mediaSource,setMediaSource] = useState<Media| null>(null)
    const [Errors,setErrors] = useState("")

    const uploadFile = (file:File) => {
        setIgnore(false)
        const imageTypes = [ValidFileTypes.JPEG,ValidFileTypes.JPG]
        const audioTypes = [ValidFileTypes.MP3]
        const videoTypes = [ValidFileTypes.MP4]

        
        let filetype = getFileType(file.name)

        if (imageTypes.includes(filetype as ValidFileTypes)) {
            setMediaSource(new ImageMediaSource(file));
        }
        else if(audioTypes.includes(filetype as ValidFileTypes)){
            setMediaSource( new AudioMediaSource(file) )
        }
        else if(videoTypes.includes(filetype as ValidFileTypes)){
            setMediaSource(new VideoMediaSource(file))
        }
        else {
           setErrors("Invalid File type")
        }
       setSelectedFiles(file)
        
      
    }

    useEffect(() => {

        if(myFile){
            uploadFile(myFile)
        }

        

    },[myFile])

    useEffect( () => {
        if(!ignore){
            if(!validateFile()){
          
            }
            else{
                if(selectedFiles ){
                    setFileUrl(URL.createObjectURL(selectedFiles))
                }
                
            }
        }
       
       return () => {
            setIgnore(true)
                URL.revokeObjectURL(fileUrl);
         }
    },[ selectedFiles,fileUrl ])

    const isValidFileType = () => {
        return mediaSource ? mediaSource.isValidFileType() : false
    }
    const isValidFileSize = () => {
        return mediaSource ? mediaSource.isValidFileSize() : false
    }
    const isValidFileName = () => {
        return mediaSource ? mediaSource.isValidFileName() : false
    }

    const validateFile = ()=>{
        let validFileName = isValidFileName();
        let validFileSize = isValidFileSize();
        let validFileType = isValidFileType();
         if( validFileName && validFileSize  && validFileType){
            return true;
        }
        else {
            setErrors(`
            The file has failed 
             Filename meets requirements: ${validFileName}
             Filesize meets requirements: ${validFileSize}
             Filetype meets requirements: ${validFileType}
            `)
            return false
        }
    }

    const getFileType = (filename = "") => {
        const position = filename.indexOf('.')
        const fileType = filename.slice(position + 1);
        return  fileType
    }

  
    return(
    <FileUploadContext.Provider value={{selectedFiles:selectedFiles,fileUrl:fileUrl,uploadFile:uploadFile,errors:Errors}}>
        { children }
    </FileUploadContext.Provider>
    )
  }

  export default FileUploadProvider;