import React from 'react';
import {Text} from 'reactors';
import {Row} from 'reactors-grid';

export default function Milestone(props) {
  const {milestone} = props;
  return (
    <Row>
      <Text>{milestone.title}</Text>
      <Text>{milestone.state}</Text>
    </Row>
  );
}
