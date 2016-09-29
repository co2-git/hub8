// @flow
import React, {Component} from 'react';
import {
  Text,
  View,
} from 'reactors';
import {connect} from 'trunks';
import Repos from '../stores/Repos';
import Repo from './Repo';

class Importer extends Component {
  componentDidMount() {
    this.props.trunks.actions.Repos.list();
  }
  render() {
    const listStatus = this.props.trunks.stores.Repos.get('listStatus');
    const repos = this.props.trunks.stores.Repos.get('repos');
    let contents;
    switch (listStatus) {
    case 'progress':
      contents = <Text>Loading your repos</Text>;
      break;
    case 'success':
      contents = repos.map(repo => <Repo key={repo.id} {...repo} />);
      break;
    }
    return (
      <View>
        {contents}
      </View>
    );
  }
}

export default connect(Importer, {Repos});
