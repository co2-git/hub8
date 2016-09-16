// import 'babel-core/register';
import 'babel-polyfill';
import Trunk from 'trunks';
import socket from '../utils/socket';
import Repos from './Repos';

export default class Socket extends Trunk {
  static store = {
    online: false,
    authenticated: false,
    login_status: null,
    login_error: null,
  };
  repos = new Repos();
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
        this.set({authenticated: true, login_status: 'success'});
        this.repos.list();
      })
      .on('authentication fails', (error) => {
        this.set({
          authenticated: false,
          login_status: 'failed',
          login_error: error,
        });
      });
  }
  login(token) {
    this.set({login_status: 'progress'});
    socket.emit('authenticate', token);
  }
}
