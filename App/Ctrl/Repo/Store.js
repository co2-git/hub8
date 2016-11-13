// import 'babel-core/register';
import 'babel-polyfill';
import Trunk from 'trunks';
import socket from '../utils/socket';

export default class Repos extends Trunk {
  static store = Trunk.map({
    repos: [],
    listStatus: null,
    pages: 0,
    page: 0,
  });
  list({page}: {page: number} = {page: 1}) {
    this.set({listStatus: 'progress'});
    socket.emit('github', {
      object: 'repos',
      method: 'getAll',
      options: {page},
    }, (res) => {
      console.log({res});
      this.set({
        listStatus: 'success',
        repos: res.body,
        pages: Number(res.head.cardinals.last),
        page: Number(res.head.cardinals.next - 1),
      });
    });
  }
}
