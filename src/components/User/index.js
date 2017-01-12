import React, { Component } from 'react'
import { connect } from 'react-redux'

import NotFound from '../NotFound'

import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import List, { ListItem } from 'material-ui/List'

class User extends Component {
  render() {
    const { user } = this.props
    if (user) {
      let { uses, expiresInDays, timeInDays, email } = user
      return <div className="small-container">
        <Subheader className="subheader-centered">Käyttäjätiedot</Subheader>
        <Paper className="form" zDepth={1}>
          <List>
            {this.renderAdmin()}
            <ListItem>Sähköposti: {email}</ListItem>
            <ListItem>Kertalippuja {uses} kpl. <span className="info-container">(umpeutuu {expiresInDays} pv. päästä)</span></ListItem>
            <ListItem>Aikaa {timeInDays} pv.</ListItem>
          </List>
        </Paper>
      </div>
    }
    return <NotFound />
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