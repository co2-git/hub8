// import 'babel-core/register';
import 'babel-polyfill';
import Trunk from 'trunks';
import socket from '../utils/socket';

export default class Projects extends Trunk {
  static store = Trunk.map({
    projects: [],
    listStatus: null,
    listError: null,
    importStatus: null,
    importError: null,
    importId: null,
    importProject: null,
  });
  list() {
    this.set({listStatus: 'progress'});
    socket.emit('projects.list', (projects) => {
      this.set({listStatus: 'success', projects});
    });
  }
  importRepo(repo) {
    this.set({importStatus: 'progress', importId: repo.id});
    socket.emit('projects.import', repo);
    const onImported = ({repo: _repo, project}) => {
      if (_repo.id === repo.id) {
        socket.off('project imported', onImported);
        this.set({
          projects: [...this.store.get('projects'), project],
          importStatus: 'success',
          importProject: project,
        });
      }
    };
    socket.on('project imported', onImported);
  }
}
