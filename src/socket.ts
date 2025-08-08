
// "undefined" means the URL will be computed from the `window.location` object

import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_COMMUNICATIONS_BACKEND || ""
 
export const socket = io(URL);
