import React, {Component} from 'react';
import Reactors, {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  Link,
} from 'reactors';
import Icon from 'reactors-icons';
import {Row} from 'reactors-grid';
import {connect} from 'trunks';
import Socket from './stores/Socket';
import Login from './components/Login';

if (Reactors.platform === 'web') {
  Icon.href = 'node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
} else if (Reactors.platform === 'desktop') {
  Icon.href = '../node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
}

class App extends Component {
  componentWillMount() {
    this.props.trunks.Socket.listen();
  }
  render() {
    const SocketStore = this.props.trunks.Socket;
    const {authenticated} = SocketStore.store;
    let icon;
    if (SocketStore.store.login_status === 'progress') {
      icon = <Icon
        name="refresh"
        />;
    } else {
      icon = <Icon
        vendor="font-awesome"
        name="circle"
        style={{color: SocketStore.store.authenticated ? 'green' : 'red'}}
        size={32}
        />;
    }
    return (
      <View style={styles.view}>
        <Row>
          {icon}
          <Text style={styles.h1}>hub8</Text>
        </Row>
        {!authenticated && <Login />}
      </View>
    );
  }
}

export default connect(App, {Socket});

const styles = StyleSheet.create({
  view: {
    marginTop: 42,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    margin: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  platformRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  link: {
    color: 'blue',
  }
});
