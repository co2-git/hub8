import 'babel-polyfill';
import Trunk from 'trunks';
import socket from '../utils/socket';

export default class Socket extends Trunk {
  static store = Trunk.map({
    online: false,
    authenticated: false,
    loginStatus: null,
    loginError: null,
    user: null,
  });
  listen() {
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
      })
      .on('authentication fails', (error: Error) => {
        this.set({
          authenticated: false,
          loginStatus: 'failed',
          loginError: error,
        });
      });
  }
  login(token) {
    this.set({loginStatus: 'pending'});
    socket.emit('authenticate', token);
  }
}
