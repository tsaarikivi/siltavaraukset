import React, { Component } from 'react'
import { connect } from 'react-redux'

import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import List, { ListItem } from 'material-ui/List'

import { getAmtDaysFromMs } from '../../actions/time'

class User extends Component {
  render() {
    const { user } = this.props
    if (user) {
      let { uses, expires, time, email } = user
      expires = getAmtDaysFromMs(expires)
      time = getAmtDaysFromMs(time)
      return <div className="small-container">
        <Subheader className="subheader-centered">Käyttäjätiedot</Subheader>
        <Paper className="form" zDepth={1}>
          <List>
            {this.renderAdmin()}
            <ListItem>Sähköposti: {email}</ListItem>
            <ListItem>Kertalippuja {uses} (umpeutuu {expires} pv. päästä)</ListItem>
            <ListItem>Aikaa {time} päivää</ListItem>
          </List>
        </Paper>
      </div>
    }
    return null
  }

  renderAdmin() {
    const { user: {admin} } = this.props
    let item = null
    if (admin) item = <ListItem>Admin</ListItem>
    return item
  }
}

function mapStateToProps({ user}) {
  return { user }
}

export default connect(mapStateToProps, null)(User)