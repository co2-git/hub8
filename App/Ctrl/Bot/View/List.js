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
import {ListView} from 'reactors';
import Bot from './ListItem';

type PROPS = {
  bots: Object[]
};

export default function ViewBotList(props: PROPS) {
  const {bots} = props;

  return (
    <ListView
      dataSource={bots}
      renderRow={(bot) => <Bot
        key={bot._id}
        bot={bot}
        router={this.props.router}
        actions={this.props.trunks.actions.bots}
        />
      }
      />
  );
}
