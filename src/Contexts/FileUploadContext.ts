
import  { createContext,useContext } from 'react';

// Define the type for the context
interface FileUploadContextType {
  selectedFiles: File | File[] | null;
  fileUrl:string;
  errors: string;
  uploadFile : (file:File) => void
}

// Create the context with a default value
export const FileUploadContext = createContext<FileUploadContextType | null>({selectedFiles:null,fileUrl:"", uploadFile: ()=> {}, errors:""})

// Custom hook to use the context
export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error('useImageUploadContext must be used within ImageUploadProvider');
  }
  return context;
};




