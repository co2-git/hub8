/**
 *
 *  @module hub8
 *  @name UiAppViewLogin
 *  @description contains view for login
 *  @author francois
 *  @license MIT
 *  @type React.Component
 *  @flow
 *
**/

import React, {Component} from 'react';
import {View} from 'reactors';
import {
  TextInput,
  Button,
} from 'reactors-form';
import Icon from 'reactors-icons';
import Router from 'reactors-router';
import SocketStore from '../Ctrl/Socket/Store';

type PROPS = {
  sockets: {
    store: Object,
    get: Function,
    login: Function,
  },
  router: Object,
};

type STATE = {
  token: string,
};

export default class Login extends Component {
  props: PROPS;
  state: STATE = {token: 'd19e5f619283d22972adc437134fa6e1a96cac19'};
  hide: boolean = false;
  componentDidUpdate() {
    if (!this.hide) {
      const {authenticated} = SocketStore.changed;
      if (authenticated) {
        const {new: isAuthenticated, old: wasAuthenticated} = authenticated;
        if (isAuthenticated && !wasAuthenticated) {
          this.hide = true;
          Router.routers.main.go('BotList');
        }
      }
    }
  }
  handleLogin() {
    SocketStore.login(this.state.token);
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Token"
          value={this.state.token}
          onChange={(token) => this.setState({token})}
          />
        <Button
          onPress={() => this.handleLogin()}
          >
          <Icon name="github" />
          Login to Github
        </Button>
      </View>
    );
  }
}
