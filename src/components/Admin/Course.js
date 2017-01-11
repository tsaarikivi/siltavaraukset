import React from 'react'

import { removeCourse, cancelCourse } from '../../actions/courses'

import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const CancelBtn = ({cancelled, uid}) => {
  let ret = null
  if (cancelled) {
    ret = <FloatingActionButton onTouchTap={() => cancelCourse(uid)} className="plus" mini={true}>
      <FontIcon className="material-icons">lock_outline</FontIcon>
    </FloatingActionButton>
  } else {
    ret = <FloatingActionButton onTouchTap={() => cancelCourse(uid)} className="plus" mini={true}>
      <FontIcon className="material-icons">lock_open</FontIcon>
    </FloatingActionButton>
  }
  return ret
}

const ReservationsList = ({reservations}) => {
  if (reservations) {
    let ret = []
    for (let res in reservations) {
      if (reservations.hasOwnProperty(res)) {
        ret.push(<li key={res}>{reservations[res]}</li>)
      }
    }
    return <ul>
      <span className="text-black">Osallistujat</span>
      {ret}
    </ul>
  }
  return null
}

const Course = ({course: {uid, kingText, cancelled, reservations}}) => {
  return <Paper className="form" zDepth={1}>
    <List>
      <ListItem
        primaryText={kingText}
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={0}
            >
            <span className="hed">Peruuta / Poista</span>
            {<CancelBtn cancelled={cancelled} uid={uid} />}
            <FloatingActionButton onTouchTap={() => removeCourse(uid)} secondary={true} className="minus" mini={true}>
              <FontIcon className="material-icons">delete</FontIcon>
            </FloatingActionButton>
          </ListItem>,
          <ReservationsList key={1} reservations={reservations} />
        ]} />
    </List>
  </Paper>
}

export default Course