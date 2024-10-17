import { useEffect } from 'react';
import { socket } from '../socket'

export const useSocket = ({isAuthenticated}) => {
    useEffect(() => {

        try{
            if(isAuthenticated){
                socket.connect()
            }
            else {
                socket.disconnect();
            }
        }
        catch(err){
            console.log('Error connecting to socket') // don't console log this 
        }

        return () => {
            socket.disconnect()
        }
    },[ isAuthenticated  ])  
    return socket;
}

