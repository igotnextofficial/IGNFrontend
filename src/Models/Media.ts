import { ValidFileTypes, ByteType } from "../Types/DataTypes"


export interface Media {
    supportedTypes:ValidFileTypes[],
    filename:string
    size:number
    validSize:number
    isValidFileType(): boolean
    isValidFileName(): boolean
    isValidFileSize(): boolean

}

class MediaSource implements Media {
    supportedTypes = [ValidFileTypes.JPEG,ValidFileTypes.JPG,ValidFileTypes.MP3]
    filename = ""
    fileType = ""
    size = 0
    validSize = 0
    uploadedFile;

    constructor(file:File){
        this.uploadedFile = file
        this.filename = file.name
        this.size = file.size
        this.fileType = file.type.slice(file.type.indexOf('/') + 1)
    }

   getFileType = () => {
    const position = this.filename.indexOf('.')
    const fileType = this.filename.slice(position + 1);
    return  fileType
   }

   isValidFileType = () => {
         const onlyLetters = /^[A-Za-z/s]+$/;
        if(onlyLetters.test(this.fileType)){
            console.log(`supported types ${this.supportedTypes} and the file type is ${this.fileType}`)
          return this.supportedTypes.includes(this.fileType as ValidFileTypes)
        } 
        return false;
    }

    isValidFileName = () => {
        let regex = /^[A-Za-z/s]+$/
        console.log("testing the filename "+ this.filename.slice(0,this.filename.indexOf('.')))
        return regex.test(this.filename.slice(0,this.filename.indexOf('.')));
    }

    isValidFileSize = () => {
        return this.size <= this.validSize
    }

    convertToValidSize = (size:number,byte:ByteType) => {
        switch (byte) {
            case ByteType.KiloBytes:
                return (size * 1024)
            case ByteType.MegaBytes:
                return (size * 1024 * 1024)
            case ByteType.GigaBytes:
                return (size * 1024 * 1024 * 1024)
            default:
                return size
        }
    }
}

export class ImageMediaSource extends MediaSource{
    constructor(file:File){
       super(file) 
       this.supportedTypes = [ValidFileTypes.JPEG,ValidFileTypes.JPG];
       this.validSize = this.convertToValidSize(1, ByteType.MegaBytes);
    }

}

export class AudioMediaSource extends MediaSource{
    constructor(file:File){
       super(file) 
       this.supportedTypes = [ValidFileTypes.MP3];
       this.validSize = this.convertToValidSize(1, ByteType.MegaBytes);
    }

}

export class VideoMediaSource extends MediaSource{
    constructor(file:File){
       super(file) 
       this.supportedTypes = [ValidFileTypes.MP4];
       this.validSize = this.convertToValidSize(1, ByteType.MegaBytes);
    }

}


// const Audio implements Media {}