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
import socket from './utils/socket';

if (Reactors.platform === 'web') {
  Icon.href = 'node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
} else if (Reactors.platform === 'desktop') {
  Icon.href = '../node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Row>
          <Icon
            vendor="font-awesome"
            name="circle"
            style={{color: 'green'}}
            size={32}
            />
          <Text style={styles.h1}>hub8</Text>
        </Row>
      </View>
    );
  }
}

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
