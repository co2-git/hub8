/**
 *
 *  @module hub8
 *  @name AppCtrlSocketStore
 *  @description contains trunk for sockets
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *
**/

import 'babel-polyfill';
import Store from '../../Util/Store';
import socket from '../../Util/socket';

export default class Socket extends Store {
  static store = {
    online: false,
    authenticated: false,
    loginStatus: null,
    loginError: null,
    user: null,
  };
  static init() {
    socket
      .on('connect', () => {
        console.log('%cconnected', 'color: green; font-weight: bold');
        this.set({online: true});
      })
      .on('disconnect', () => {
        console.log('%cdisconnected', 'color: red; font-weight: bold');
        this.set({online: false});
      })
      .on('authenticated', (user) => {
        this.set({authenticated: true, loginStatus: 'success', user});
        socket.user = user;
      })
      .on('authentication fails', (error: Error) => {
        this.set({
          authenticated: false,
          loginStatus: 'failed',
          loginError: error,
        });
      })
      .on('message', (message) => {
        if (message.maevaWarning) {
          console.log({maevaWarning: message.maevaWarning});
        } else {
          console.log({message});
        }
      });
  }
  static login(token: string) {
    this.set({loginStatus: 'pending'});
    socket.emit('authenticate', {token});
  }
}
