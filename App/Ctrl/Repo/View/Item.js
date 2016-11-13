// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'reactors';
import {Row} from 'reactors-grid';
import {Button} from 'reactors-form';
import moment from 'moment';
import {connect} from 'trunks';
import _ from 'lodash';
import Router from 'reactors-router';
import Projects from '../../stores/Projects';

function Repo(props) {
  const {Projects: ProjectsStore} = props.trunks.stores;
  const {Projects: ProjectsActions} = props.trunks.actions;
  const importStatus = ProjectsStore.get('importStatus');
  const importId = ProjectsStore.get('importId');
  const importProject = ProjectsStore.get('importProject');

  let buttonText = 'Import';
  let buttonAction = () =>
    ProjectsActions.importRepo(_.omit(props, ['trunks']));

  if (importId === props.id) {
    if (importStatus === 'progress') {
      buttonText = 'Importing';
      buttonAction = () => 0;
    } else if (importStatus === 'success') {
      buttonText = 'Open';
      buttonAction = () => Router.routers.hub8.go('ProjectPage', {
        project: importProject,
      });
    }
  }

  return (
    <View style={styleSheet.container}>
      <Text style={styleSheet.header}>{props.name}</Text>
      <Row>
        <Row>
          <Text>Created</Text>
          <Text>{moment(props.created_at).fromNow()}</Text>
        </Row>
        <Row>
          <Text>Last updated</Text>
          <Text>{moment(props.updated_at).fromNow()}</Text>
        </Row>
        <Button onPress={buttonAction}>{buttonText}</Button>
      </Row>
    </View>
  );
}

export default connect(Repo, {Projects});

const styleSheet = new StyleSheet({
  container: {
    borderWidth: 2,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
