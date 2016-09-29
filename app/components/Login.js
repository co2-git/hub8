import React, {Component} from 'react';
import {View} from 'reactors';
import {connect} from 'trunks';
import {
  TextInput,
  Button,
} from 'reactors-form';
import Icon from 'reactors-icons';
import Socket from '../stores/Socket';

class Login extends Component {
  state = {token: ''};
  login() {
    this.props.trunks.actions.Socket.login(this.state.token);
  }
  componentDidUpdate(prevProps) {
    const {Socket: current} = this.props.trunks.stores;
    const {Socket: prev} = prevProps.trunks.stores;
    if (current.get('authenticated') && !prev.get('authenticated')) {
      this.props.router.go('ProjectsList');
    }
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
