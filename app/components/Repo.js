import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'reactors';
import {Row} from 'reactors-grid';
import moment from 'moment';

export default function Repo(props) {
  console.log(props);
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
