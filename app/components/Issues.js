import React from 'react';
import {
  ListView,
  View,
  Text,
} from 'reactors';
import {Row} from 'reactors-grid';
import Issue from './Issue';

export default function Issues(props) {
  console.info({props});
  const {issues} = props;
  if (!issues) {
    return <View />;
  }
  const open = issues.filter(issue => issue.state === 'open');
  return (
    <View>
      <Row>
        <Text>{open.length}/{issues.length} issue(s)</Text>
      </Row>
      <ListView
        dataSource={open}
        renderRow={(issue) => <Issue key={issue._id} issue={issue} />}
        />
    </View>
  );
}
