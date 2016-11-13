// @flow

import React from 'react';
import {
  Text,
  StyleSheet,
} from 'reactors';
import {Row} from 'reactors-grid';
import Icon from 'reactors-icons';
import type {ISSUE, PROJECT} from 'hub8-models';
import Projects from '../../stores/Projects';

type PROPS = {
  issue: ISSUE,
  project: PROJECT,
};

export default function Issue(props: PROPS) {
  const {issue, project} = props;
  const projects = new Projects();
  let icon;
  switch (projects.store.get('closeIssueStatus')) {
  default:
    icon = (
      <Icon
        vendor="font-awesome"
        name="check"
        style={{color: issue.state === 'open' ? '#999' : 'green'}}
        onPress={() => {
          if (issue.state === 'open') {
            projects.closeIssue(issue, project);
          }
        }}
        />
    );
    break;
  case 'progress':
    icon = (
      <Icon
        vendor="font-awesome"
        name="refresh"
        />
    );
    break;
  }
  return (
    <Row>
      {icon}
      <Text style={style.number}>#{issue.number}</Text>
      <Text>{issue.title}</Text>
    </Row>
  );
}

const style = new StyleSheet({
  number: {
    color: 'gray',
  },
});
