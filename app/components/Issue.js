import React from 'react';
import {
  Text,
} from 'reactors';

export default function Issue(props) {
  return (
    <Text>{props.issue.title}</Text>
  );
}
