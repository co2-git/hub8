/**
 *
 *  @module hub8
 *  @name UiAppUtil_socket
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *
**/
/* global window */
import Reactors from 'reactors';
import config from './config';

let io;

if (Reactors.platform === 'mobile') {
  if (window.navigator && Object.keys(window.navigator).length === 0) {
    window = Object.assign(window, {navigator: {userAgent: 'ReactNative'}});
  }
  io = require('socket.io-client/socket.io');
} else {
  io = require('socket.io-client');
}

export default io(config.SOCKET_URL, {
  transports: ['websocket'],
});
