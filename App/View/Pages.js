// @flow

import React from 'react';
import {
  Text,
} from 'reactors';
import {Row} from 'reactors-grid';

type PROPS = {
  pages: number,
  page: number,
  handler: (page: number) => void,
};

export default function Pages(props: PROPS) {
  const pages = [];
  for (let index = 0; index < props.pages; index++) {
    pages.push(
      <Text
        key={index}
        onPress={() => {
          if (typeof props.handler === 'function') {
            console.log({index: index + 1});
            props.handler(index + 1);
          }
        }}
        >{index + 1}
      </Text>
    );
  }
  return (
    <Row>
      {pages}
    </Row>
  );
}
