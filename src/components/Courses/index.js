import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';

import './styles.css'

export default class Courses extends Component {
  render() {
    return <div>
      <Paper zDepth={1} className="course-day">
        <List>
          <Subheader>Torstai 5.1.2017</Subheader>
          <Divider />
          <ListItem
            rightIcon={<Chip
              >
              Deletable Text Chip
        </Chip>}
            primaryText="Terve Keho"
            secondaryText="17:30 - 18:30"
            />
        </List>
      </Paper>
    </div>
  }
}