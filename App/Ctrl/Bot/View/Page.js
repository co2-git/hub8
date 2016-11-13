/**
 *
 *  @name UI.Component.Bot.List
 *  @module hub8
 *  @description Render List View of bots
 *  @author francois
 *  @license: MIT
 *  @flow
 *
**/

import React from 'react';
import {
  View,
  Text,
} from 'reactors';
import BotStore from '../Store';
import ActionStore from '../../Action/Store';
import Component from '../../../Util/Component';
import List from './List';
import Add from './Add';

export default class BotList extends Component {
  connectors = [BotStore, ActionStore];
  componentDidMount() {
    BotStore.init();
    ActionStore.init();
  }
  render() {
    const bots = BotStore.get('bots');
    const actions = ActionStore.get('actions');
    return (
      <View>
        <Add
          actions={actions}
          handler={({action}) => BotStore.add({action})}
          />
        <Text>{bots.length} bot(s)</Text>
        <List bots={bots} />
      </View>
    );
  }
}
