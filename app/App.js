// @flow
import React, {Component} from 'react';
import Reactors, {Dimensions, View} from 'reactors';
import Icon from 'reactors-icons';
import Router, {Route} from 'reactors-router';
import {connect} from 'trunks';
import Socket from './stores/Socket';
import TopBar from './components/TopBar';
import ProjectsList from './components/Projects';
import Login from './components/Login';
import ProjectPage from './components/ProjectPage';
import Importer from './components/Importer';

if (Reactors.platform === 'web') {
  Icon.href = 'node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
} else if (Reactors.platform === 'desktop') {
  Icon.href = '../node_modules/reactors-icons/assets/' +
    'font-awesome/css/font-awesome.css';
}

class App extends Component {
  componentWillMount() {
    this.props.trunks.actions.Socket.listen();
  }
  render() {
    return (
      <View>
        <TopBar />
        <Router initial={Login} name="hub8" width={Dimensions.get().width}>
          <Route scene={Login} />
          <Route scene={ProjectsList} />
          <Route scene={ProjectPage} />
          <Route scene={Importer} />
        </Router>
      </View>
    );
  }
}

export default connect(App, {Socket});
