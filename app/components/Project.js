import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Link,
} from 'reactors';
import {Row} from 'reactors-grid';
import {Button} from 'reactors-form';
import moment from 'moment';
import {connect} from 'trunks';
import _ from 'lodash';
import Projects from '../stores/Projects';

function Project(props) {
  const {project} = props;
  return (
    <View style={styleSheet.container}>
      <Link style={styleSheet.header} onPress={() => {
        props.router.go('ProjectPage', {project});
      }}>
        {project.name} v{project.version}
      </Link>
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

export default connect(Project, {Projects});

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
