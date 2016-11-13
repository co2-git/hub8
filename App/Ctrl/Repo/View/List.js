// @flow
import React, {Component} from 'react';
import {
  Text,
  View,
} from 'reactors';
import {connect} from 'trunks';
import Repos from '../../stores/Repos';
import Repo from './Item';
import Pages from '../Pagination/Pages';

class RepoList extends Component {
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
    default:
      contents = <Text>List of your repos</Text>;
      break;
    }
    return (
      <View>
        {contents}
        <View style={{margin: 30}}>
          <Pages
            pages={this.props.trunks.stores.Repos.get('pages')}
            page={this.props.trunks.stores.Repos.get('page')}
            handler={(page) => this.props.trunks.actions.Repos.list({page})}
            />
        </View>
      </View>
    );
  }
}

export default connect(RepoList, {Repos});
