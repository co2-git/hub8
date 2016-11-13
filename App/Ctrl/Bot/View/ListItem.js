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
import type Bot_JSON from 'hub8-models';
import Router from 'reactors-router';
import Icon from 'reactors-icons';

type PROPS = {
  Bot: Bot_JSON,
  router: Router,
  actions: {[action: string]: Function},
};

export default function Bot(props: PROPS) {
  const {Bot} = props;
  const importStatus = Bot.getImportStatusPercentage();

  let version;
  if (Bot.importStatus.version) {
    const {major, minor, patch} = Bot.version;
    version = `${major}.${minor}.${patch}`;
  } else {
    version = '...';
  }

  return (
    <View style={styleSheet.container}>
      <Row>
        <Link style={styleSheet.header} onPress={() => {
          props.router.go('BotPage', {Bot});
        }}>
          {Bot.name} v{version}
        </Link>
        {importStatus < 100 && (
          <Text>Bot imported at {importStatus}%</Text>
        )}
        <Icon
          name="close"
          onPress={() => props.actions.close(Bot._id)}
          />
      </Row>
      <Row>
        <Row>
          <Text>Created</Text>
          <Text>{moment(Bot.created_at).fromNow()}</Text>
        </Row>
        <Row>
          <Text>Last updated</Text>
          <Text>{moment(Bot.updated_at).fromNow()}</Text>
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
