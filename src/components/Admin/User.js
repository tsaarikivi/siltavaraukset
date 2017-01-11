import React from 'react'

import {
  incrementUses, incrementExpires, incrementTime,
  decrementUses, decrementExpires, decrementTime
} from '../../actions/users'

import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const User = ({ user: {email, time, uses, expires, uid} }) => {
  return <Paper className="form" zDepth={1}>
    <List>
      <ListItem
        primaryText={email}
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={0}
            >
            <span className="hed">Kerrat {uses}</span>
            <FloatingActionButton onTouchTap={() => incrementUses(uid)} className="plus" mini={true}>
              <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
            <FloatingActionButton onTouchTap={() => decrementUses(uid)} secondary={true} className="minus" mini={true}>
              <FontIcon className="material-icons">remove</FontIcon>
            </FloatingActionButton>
          </ListItem>,
          <ListItem
            key={1}
            >
            <span className="hed">Päättyy {expires}</span>
            <FloatingActionButton onTouchTap={() => incrementExpires(uid)} className="plus" mini={true}>
              <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
            <FloatingActionButton onTouchTap={() => decrementExpires(uid)} secondary={true} className="minus" mini={true}>
              <FontIcon className="material-icons">remove</FontIcon>
            </FloatingActionButton>
          </ListItem>,
          <ListItem
            key={2}
            >
            <span className="hed">Aikaa {time}</span>
            <FloatingActionButton onTouchTap={() => incrementTime(uid)} className="plus" mini={true}>
              <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
            <FloatingActionButton onTouchTap={() => decrementTime(uid)} secondary={true} className="minus" mini={true}>
              <FontIcon className="material-icons">remove</FontIcon>
            </FloatingActionButton>
          </ListItem>
        ]} />
    </List>
  </Paper>
}

export default User
