import React, {Component} from 'react';
import {View, ListView} from 'reactors';
import {connect} from 'trunks';
import {Row} from 'reactors-grid';
import {Button, TextInput} from 'reactors-form';
import Icon from 'reactors-icons';
import Milestone from './Milestone';
import Milestones from '../stores/Milestones';

class RoadMap extends Component {
  state = {newVersion: ''};
  render() {
    return (
      <View>
        <Row>
          <TextInput
            placeholder="New version"
            onChange={(newVersion) => this.setState({newVersion})}
            />
          <Button
            onPress={() => {
              if (this.state.newVersion) {
                this.props.trunks.actions.Milestones.add({
                  project: this.props.project,
                  title: this.state.newVersion,
                });
              }
            }}
            >
            <Icon vendor="font-awesome" name="plus" />
          </Button>
        </Row>
        <ListView
          dataSource={this.props.milestones}
          renderRow={(milestone) => <Milestone milestone={milestone} />}
          />
      </View>
    );
  }
}

export default connect(RoadMap, {Milestones});
