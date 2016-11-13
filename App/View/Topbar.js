/**
 *
 *  @module hub8
 *  @name AppViewTopbar
 *  @description contains top bar view
 *  @author francois
 *  @license: MIT
 *  @type function
 *  @flow
 *
**/

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'reactors';
import {Row} from 'reactors-grid';
import Icon from 'reactors-icons';
import Router from 'reactors-router';
import SocketStore from '../Ctrl/Socket/Store';

export default function TopBar() {
  // destructure stores
  const {
    authenticated,
    loginStatus,
    user,
  } = SocketStore.get();

  const foos = ['hello'];

  return (
    <View style={styleSheet.container}>
      <Row>
        <Text
          style={styleSheet.link}
          onPress={
            () => authenticated && Router.routers.main.go('ProjectsList')
          }
          >
          Projects
        </Text>

        <Text
          style={styleSheet.link}
          >
          Stories
        </Text>

        <Text
          style={styleSheet.link}
          >
          Versions
        </Text>

        <Text
          onPress={
            () => authenticated && Router.routers.main.go('BotList')
          }
          style={styleSheet.link}
          >
          Bots
        </Text>

        {authenticated && (
          <Row>
            <Icon
              vendor="font-awesome"
              name="circle"
              style={{
                color: 'green',
              }}
              />
            <Text style={{color: 'white'}}>{user.name}</Text>
          </Row>
        )}

        {!authenticated && (
          <Row>
            {loginStatus === 'pending' &&
              <Icon
                vendor="font-awesome"
                name="refresh"
                />
            }
            {loginStatus !== 'pending' &&
              <Icon
                vendor="font-awesome"
                name="circle"
                style={{
                  color: authenticated ? 'green' : 'red',
                }}
                />
            }
            <Text
              onPress={() => Router.routers.main.go('Login')}
              style={styleSheet.link}
              >Login
            </Text>
          </Row>
        )}
      </Row>
    </View>
  );
}

const styleSheet = new StyleSheet({
  container: {
    padding: 12,
    background: '#444',
  },
  userSpace: {
    flexDisplay: true,
    justifyContents: 'end',
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'white',
  },
});
