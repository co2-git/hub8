// import 'babel-core/register';
import 'babel-polyfill';
import Trunk from 'trunks';
import socket from '../utils/socket';

export default class Repos extends Trunk {
  static store = Trunk.map({
    repos: [],
    listStatus: null,
  });
  list() {
    this.set({listStatus: 'progress'});
    socket.emit('repos.list', (repos) => {
      this.set({listStatus: 'success', repos});
    });
  }
}
