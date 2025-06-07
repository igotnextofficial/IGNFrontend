// events.ts

export const SOCKET_EVENTS = {
  USER: {
    CONNECTED: 'user:connected',
    DISCONNECTED: 'user:disconnected',
   
 
  },
  MENTOR: {
    MESSAGE: 'mentor:message',
    REQUEST: 'mentor:request',
 
  },
  SESSION: {
    STATUS: 'session:status',
    UPCOMING: 'session:upcoming',
  },
  SYSTEM: {
    ERROR: 'system:error',
    NOTIFICATION: 'system:notification',
  },
};
