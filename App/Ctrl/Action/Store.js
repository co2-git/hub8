/**
 *
 *  @module hub8
 *  @name UiAppCtrlBotStore
 *  @description contains trunk for bots
 *  @author francois
 *  @license MIT
 *  @type (Trunk)
 *  @flow
 *
**/

import 'babel-polyfill';
import _ from 'lodash';
import {Action as ActionModel} from 'hub8-models';
import * as models from 'hub8-models';
import socket from '../../Util/socket';
import Store from '../../Util/Store';

export default class ActionStore extends Store {
  static store = {
    actions: [],
    listStatus: null,
    listError: null,
  };
  static inited = false;
  static init() {
    console.log({ActionModel, models});
    if (!this.inited) {
      this.inited = true;
      this.list();
    }
  }
  static list() {
    this.set({listStatus: 'progress'});
    socket.emit(
      'db',
      {
        model: 'Action',
        action: 'find',
        args: [],
      },
      (_actions) => {
        const actions = _actions.map(action => {
          const modelized = new ActionModel(action);
          modelized._id = action._id;
          return modelized;
        });
        console.log({ActionStore: {list: actions}});
        this.set({
          listStatus: 'done',
          actions,
        });
      }
    );
  }
}
