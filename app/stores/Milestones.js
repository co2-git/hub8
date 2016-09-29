import Trunk from 'trunks';
import socket from '../utils/socket';

export default class Milestones extends Trunk {
  static store = Trunk.map({
    addStatus: null,
  });
  add({project, title}) {
    this.set({addStatus: 'progress'});
    socket.emit('milestones.add', project, title);
  }
}
