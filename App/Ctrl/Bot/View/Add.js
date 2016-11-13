/**
 *
 *  @module hub8
 *  @name BotViewAdd
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *
**/

import React, {Component} from 'react';
import {
  Text,
} from 'reactors';
import {Dropdown, Button} from 'reactors-form';
import {Row} from 'reactors-grid';
import _ from 'lodash';

type PROPS = {
  actions: Object[],
  handler?: () => void,
};

type STATE = {
  action: string,
};

export default class BotViewAdd extends Component {
  props: PROPS;
  state: STATE = {action: ''};
  componentWillReceiveProps(nextProps: PROPS) {
    const {actions: nextActions} = nextProps;
    const {actions: currentActions} = this.props;
    if (nextActions.length && !currentActions.length) {
      this.setState({action: nextActions[0]._id});
    }
  }
  render() {
    const actions = this.props.actions.map(action => ({
      label: action.name,
      key: action._id,
    }));
    return (
      <Row>
        <Text>New bot</Text>
        <Dropdown
          data={actions}
          onChange={(action) => this.setState({action})}
          />
        <Button
          onPress={() => {
            if (typeof this.props.handler === 'function') {
              this.props.handler(this.state);
            }
          }}
          >
          Add
        </Button>
      </Row>
    );
  }
}
