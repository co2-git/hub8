// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Link,
} from 'reactors';
import {Row} from 'reactors-grid';
import moment from 'moment';
import _ from 'lodash';
import type PROJECT_JSON from 'hub8-models';
import Router from 'reactors-router';
import Icon from 'reactors-icons';

type PROPS = {
  project: PROJECT_JSON,
  router: Router,
  actions: {[action: string]: Function},
};

export default function Project(props: PROPS) {
  const {project} = props;
  const importStatus = project.getImportStatusPercentage();

  let version;
  if (project.importStatus.version) {
    const {major, minor, patch} = project.version;
    version = `${major}.${minor}.${patch}`;
  } else {
    version = '...';
  }

  return (
    <View style={styleSheet.container}>
      <Row>
        <Link style={styleSheet.header} onPress={() => {
          props.router.go('ProjectPage', {project});
        }}>
          {project.name} v{version}
        </Link>
        {importStatus < 100 && (
          <Text>Project imported at {importStatus}%</Text>
        )}
        <Icon
          name="close"
          onPress={() => props.actions.close(project._id)}
          />
      </Row>
      <Row>
        <Row>
          <Text>Created</Text>
          <Text>{moment(project.created_at).fromNow()}</Text>
        </Row>
        <Row>
          <Text>Last updated</Text>
          <Text>{moment(project.updated_at).fromNow()}</Text>
        </Row>
      </Row>
    </View>
  );
}

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
