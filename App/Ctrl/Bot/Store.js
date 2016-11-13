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

import _ from 'lodash';
import {Bot as BotModel} from 'hub8-models';
import type {BOT} from 'hub8-models';
import socket from '../../Util/socket';
import Store from '../../Util/Store';

type STORE = {
  bots: BOT[],
  listStatus: ?string,
  listError: ?Error,
  addStatus: ?string,
  addError: ?Error,
};

export default class BotStore extends Store {
  static store: STORE = {
    bots: [],

    listStatus: null,
    listError: null,

    addStatus: null,
    addError: null,
  };
  static inited = false;
  static init() {
    if (!this.inited) {
      this.inited = true;
      socket
        .on('inserted Bot', (bot) => {
          process.nextTick(() => {
            this.set({
              importStatus: 'success',
              bots: [...this.get('bots'), bot],
            });
          });
        });
      this.list();
    }
  }
  static list() {
    this.set({listStatus: 'progress'});
    socket.emit(
      'db',
      {
        model: 'Bot',
        action: 'find',
        args: [],
      },
      (bots) => {
        console.log({BotStore: {list: bots}});
        this.set({
          listStatus: 'done',
          bots: bots.map(bot => {
            const modelized = new BotModel(bot);
            modelized._id = bot._id;
            return modelized;
          }),
        });
      }
    );
  }
  static add(bot: BOT) {
    this.set({addStatus: 'progress'});
    socket.emit('db', {model: 'Bot', action: 'create', args: [{
      ...bot,
      user: socket.user,
    }]});
  }
}
