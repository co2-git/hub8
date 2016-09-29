// @flow
import React, {Component} from 'react';
import {connect} from 'trunks';
import {
  Text,
  View,
  Dimensions,
} from 'reactors';
import {Row} from 'reactors-grid';
import {Button} from 'reactors-form';
import Router, {Route} from 'reactors-router';
import Projects from '../stores/Projects';
import Issues from './Issues';
import RoadMap from './RoadMap';

class ProjectPage extends Component {
  render() {
    const {project} = this.props;
    return (
      <View>
        <Text>
          {project.name} v{project.version} {project.issues.length} issue(s)
        </Text>
        <Row>
          <Button
            onPress={() => Router.routers.hub8_project.go('RoadMap')}
            >
            Roadmap
          </Button>
          <Button
            onPress={() => Router.routers.hub8_project.go('Issues')}
            >
            Issues
          </Button>
        </Row>
        <Router
          initial={RoadMap}
          name="hub8_project"
          width={Dimensions.get().width}
          >
          <Route
            scene={RoadMap}
            props={{
              project,
              milestones: project.milestones,
            }}
            />
          <Route scene={Issues} props={{issues: project.issues}} />
        </Router>
      </View>
    );
  }
}

export default connect(ProjectPage, {Projects});
