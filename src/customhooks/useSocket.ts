// useSocket.ts
import { useEffect, useState,useRef } from 'react';
import { socket } from '../socket';
import { useUser } from '../contexts/UserContext';
import { UserDataType } from '../types/DataTypes';
import { SOCKET_EVENTS } from '../config/events';
export const useSocket =  ({ user }: { user: UserDataType | null }) => {
  const [isReady, setIsReady] = useState(socket.connected);
  const eventQueue = useRef([] as { event: string; data: any }[]);
  const MaxEventQueueSize = 50;

  useEffect(() => {
    const handleConnect = () => {
     if(user && user.id) {

       socket.emit('joinRoom',  `user:${user?.id}` );
       socket.emit('joinRoom',  SOCKET_EVENTS.SYSTEM.NOTIFICATION);
    
     }
      setIsReady(true);
    };
    const handleDisconnect = () => setIsReady(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [user?.id]);

  useEffect(() => {
    if (isReady) {
      // Process any queued events when the socket is ready
      while (eventQueue.current.length > 0) {
        const { event, data } = eventQueue.current.shift()!;
        socket.emit(event, data);
      }
    }
  }, [isReady]);

  const sendMessage = (event: string, data: any, retryIfDisconnected = false) => {
    let oldestEvent = null;
    if (isReady && socket.connected) {
 
        socket.emit(event, data);
 
    } 
    else  {
      if(!retryIfDisconnected) {return}
      if(eventQueue.current.length >= MaxEventQueueSize) {
       
        oldestEvent = eventQueue.current.shift();
        // Optionally, you can log or handle the oldest event ? or maybe not neccessary
      }
      eventQueue.current.push({ event, data });
    }
  }

  const recieveMessage = (event: string, callback: (data: any) => void) => {
    if (isReady && socket.connected) {
      socket.on(event, callback);
    } else {
      console.warn('Socket is not ready. Cannot listen for message:', event);
    }
  }

  const joinRoom = (room: string) => {
    if (isReady && socket.connected) {
      socket.emit('joinRoom', room);
    }  
  }

  return {
    sendMessage,
    recieveMessage,
    joinRoom,
    socket,
    isReady,
  };
};