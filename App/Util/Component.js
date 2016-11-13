/**
 *  @name MyReactView
**/

import React, {Component} from 'react';

type STATE = {
  changed: {[storeName: string]: number},
};

export default class CustomComponent extends Component {
  state: STATE = {changed: {}};
  connectors: Function[] = [];
  __changers = {};
  componentWillMount() {
    for (const connector of this.connectors) {
      this.__changers[connector.name] = () => {
        this.setState({
          ...this.state,
          changed: {
            ...this.state.changed,
            [connector.name]: this.state.changed[connector.name] + 1,
          },
        });
      };
    }
    for (const connector of this.connectors) {
      connector.on('change', this.__changers[connector.name]);
    }
  }
  componentWillUnmount() {
    for (const connector of this.connectors) {
      connector.off('change', this.__changers[connector.name]);
    }
  }
}
