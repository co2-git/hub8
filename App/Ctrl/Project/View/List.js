// @flow

import React, {Component} from 'react';
import {
  View,
  Text,
} from 'reactors';
import {connect} from 'trunks';
import {Button} from 'reactors-form';
import Router from 'reactors-router';
import Projects from '../../stores/Projects';
import Repos from '../../stores/Repos';
import Socket from '../../stores/Socket';
import Project from './Item';

class ProjectsList extends Component {
  componentDidMount() {
    this.props.trunks.actions.Projects.listen();
    this.props.trunks.actions.Projects.list();
  }
  render() {
    const {Projects: _Projects} = this.props.trunks.stores;
    const listStatus = _Projects.get('listStatus');
    const projects = _Projects.get('projects');

    const {Socket: _Socket} = this.props.trunks.stores;
    const authenticated = _Socket.get('authenticated');

    let listOfProjects;
    if (!listStatus) {
      listOfProjects = <Text>Here you will see your list of projects</Text>;
    } else if (listStatus === 'progress') {
      listOfProjects = <Text>Loading your ** projects...</Text>;
    } else if (!projects.length) {
      listOfProjects = <View>
        <Text>No projects for the moment</Text>
      </View>;
    } else {
      listOfProjects = projects.map(project => <Project
        key={project._id}
        project={project}
        router={this.props.router}
        actions={this.props.trunks.actions.Projects}
        />
      );
    }

    return (
      <View>
        {authenticated &&
          <Button onPress={() => Router.routers.hub8.go('RepoList')}>
            Import from Github
          </Button>
        }
        {listOfProjects}
      </View>
    );
  }
}

export default connect(ProjectsList, {Repos, Projects, Socket});
