// @flow

import React from 'react';
import {
  ListView,
  View,
  Text,
} from 'reactors';
import {Row} from 'reactors-grid';
import type {ISSUE, PROJECT} from 'hub8-models';
import Issue from './item';
import AddIssue from './add';

type PROPS = {
  issues: () => ISSUE[],
  project: PROJECT,
};

export default function Issues(props: PROPS) {
  const issues = props.issues();
  if (!issues) {
    return <View />;
  }
  const open = issues.filter(issue => issue.state === 'open');
  return (
    <View>
      <AddIssue project={props.project} />
      <Row>
        <Text>{open.length}/{issues.length} issue(s)</Text>
      </Row>
      <ListView
        dataSource={open}
        renderRow={(issue) =>
          <Issue
            key={issue._id}
            issue={issue}
            project={props.project}
            />
          }
        />
    </View>
  );
}
