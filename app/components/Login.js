import React, {Component} from 'react';
import {connect} from 'trunks';
import {
  View,
  Text,
} from 'reactors';
import {
  TextInput,
  Button,
} from 'reactors-form';
import Icon from 'reactors-icons';
import Socket from '../stores/Socket';

class Login extends Component {
  state = {token: ''};
  login() {
    this.props.trunks.Socket.login(this.state.token);
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
          onPress={() => this.login()}
          >
          <Icon name="github" />
          Login to Github
        </Button>
      </View>
    );
  }
}

export default connect(Login, {Socket});
