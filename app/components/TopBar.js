// @flow
import React from 'react';
import {
  Text,
} from 'reactors';
import {Row} from 'reactors-grid';
import Icon from 'reactors-icons';
import {connect} from 'trunks';
import Socket from '../stores/Socket';

function TopBar(props) {
  const {Socket: _Socket} = props.trunks.stores;
  const authenticated = _Socket.get('authenticated');
  const loginStatus = _Socket.get('loginStatus');
  const user = _Socket.get('user');
  return (
    <Row>
      {loginStatus === 'pending' &&
        <Icon
          vendor="font-awesome"
          name="refresh"
          />
      }
      {loginStatus !== 'pending' &&
        <Icon
          vendor="font-awesome"
          name="circle"
          style={{
            color: authenticated ? 'green' : 'red',
          }}
          />
      }
      <Text>hub8</Text>
      {authenticated && <Text>{user.login}</Text>}
    </Row>
  );
}

export default connect(TopBar, {Socket});
