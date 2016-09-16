// import 'babel-core/register';
import 'babel-polyfill';
import Trunk from 'trunks';
import socket from '../utils/socket';

export default class Repos extends Trunk {
  static store = {
    repos: [],
    list_status: null,
  };
  list() {
    this.set({list_status: 'progress'});
    socket.emit('repos.list', (repos) => {
      this.set({list_status: 'success', repos});
    });
  }
}
