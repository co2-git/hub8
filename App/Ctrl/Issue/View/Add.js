// @flow

import React, {Component} from 'react';
import {Text} from 'reactors';
import {Row} from 'reactors-grid';
import {TextInput, Button, Dropdown} from 'reactors-form';
import type {PROJECT} from 'hub8-models';
import Projects from '../../stores/Projects';

type PROPS = {
  project: PROJECT,
};

type STATE = {
  newIssueName: string,
  milestone: string,
};

export default class AddIssue extends Component {
  props: PROPS;
  state: STATE = {
    newIssueName: '',
    milestone: this.props.project.milestones[0].number,
  };
  render() {
    const projects = new Projects();
    return (
      <Row>
        <Text>New Issue</Text>
        <Dropdown
          data={
            this.props.project.milestones
              .filter(milestone => milestone.state === 'open')
              .map(milestone => ({
                key: milestone.number,
                label: milestone.title,
              }))
          }
          onChange={(milestone) => {
            console.log({milestone});
            this.setState({milestone});
          }}
          />
        <TextInput
          placeholder="Create new issue"
          value={this.state.newIssueName}
          onChange={(newIssueName) => this.setState({newIssueName})}
          />
        <Button
          onPress={() => projects.createIssue(
            {
              title: this.state.newIssueName,
              body: '...',
            },
            this.state.milestone,
            this.props.project
          )}
          >Create
        </Button>
      </Row>
    );
  }
}
