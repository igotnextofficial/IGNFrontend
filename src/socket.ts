
// "undefined" means the URL will be computed from the `window.location` object

import { io } from 'socket.io-client';
const URL = 'https://fury.igotnext.local';
 
export const socket = io(URL);
