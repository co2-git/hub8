/**
 *
 *  @module hub8
 *  @name UiApp
 *  @description contains basic layout + router rules
 *  @author francois
 *  @license: MIT
 *  @flow
 *
**/

import React from 'react';
import Reactors, {Dimensions, View} from 'reactors';
// Stores
import {connect} from 'trunks';
import SocketStore from './Ctrl/Socket/Store';
// Routes
import Router, {Route} from 'reactors-router';
import TopBar from './View/TopBar';
import Login from './View/Login';
import BotPage from './Ctrl/Bot/View/Page';
// Elements
import Icon from 'reactors-icons';
// Util
import Component from './Util/Component';

if (Reactors.platform === 'web') {
  Icon.href = 'node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
} else if (Reactors.platform === 'desktop') {
  Icon.href = '../node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
}

class App extends Component {
  connectors = [SocketStore];
  componentDidMount() {
    SocketStore.init();
  }
  render() {
    return (
      <View>
        <TopBar />
        <Router initial={Login} name="main" width={Dimensions.get().width}>
          <Route scene={Login} />
          <Route scene={BotPage} />
        </Router>
      </View>
    );
  }
}

export default connect(App, {SocketStore});
