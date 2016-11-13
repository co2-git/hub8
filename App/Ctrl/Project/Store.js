// import 'babel-core/register';
import 'babel-polyfill';
import Trunk from 'trunks';
import {Project as ProjectModel} from 'hub8-models';
import _ from 'lodash';
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
    closeIssueStatus: null,
    closeIssueError: null,
    createIssueStatus: null,
    createIssueError: null,
  });
  listen() {
    socket
      .on('inserted Project', (project) => {
        process.nextTick(() => {
          this.set({
            importStatus: 'success',
            projects: [...this.store.get('projects'), project],
          });
        });
        process.nextTick(() => {
          socket.emit('utils', 'getFile', {
            user: socket.user.name,
            repo: project.name,
            file: 'package.json',
          }, (contents) => {
            console.log({contents});
          });
        });
      })
      .on('new issue', (issue) => {
        const projects = this.get('projects').map(project => {
          if (project._id === issue.project) {
            project.issues.push(issue);
          }
          return project;
        });
        this.set({projects});
      })
      .on('dropped issue', (issueId) => {
        const projects = this.get('projects').map(project => {
          project.issues = project.issues.filter(issue => issue.id !== issueId);
          return project;
        });
        this.set({projects});
      })
      .on('issue closed', ({issue, project}) => {
        console.log({issueClosed: {issue, project}});
      });
  }
  list() {
    this.set({listStatus: 'progress'});
    socket.emit(
      'db',
      {
        model: 'Project',
        action: 'find',
        args: [],
      },
      (projects) => {
        console.log({projects});
        this.set({
          listStatus: 'done',
          projects: projects.map(project => {
            const modelized = new ProjectModel(project);
            modelized._id = project._id;
            return modelized;
          }),
        });
      }
    );
  }
  importRepo(repo) {
    this.set({importStatus: 'progress', importId: repo.id});
    socket.emit(
      'db',
      {
        model: 'Project',
        action: 'importRepo',
        args: [
          repo,
          socket.user,
        ]
      }
    );
  }
  closeIssue(issue, project) {
    this.set({closeIssueStatus: 'progress'});
    socket.emit('issues.close', {issue, project});
  }
  createIssue(issue, milestone, project) {
    this.set({createIssueStatus: 'progress'});
    console.log('issues.create', {issue, milestone, project});
    socket.emit('issues.create', {issue, milestone, project});
  }
  close(projectId) {
    console.log({projectId});
    socket.emit(
      'db',
      {
        model: 'Project',
        action: 'removeById',
        args: [projectId],
      }
    );
  }
}
