import React, { Component } from 'react'
import { connect } from 'react-redux'

import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import List, { ListItem } from 'material-ui/List'

class User extends Component {
  render() {
    const { user } = this.props
    if (user) {
      return <div className="small-container">
        <Paper zDepth={1}>
          <List>
            <Subheader>Käyttäjätiedot</Subheader>
            <Divider />
            {this.renderAdmin()}
            <ListItem>Sähköposti: {user.email}</ListItem>
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