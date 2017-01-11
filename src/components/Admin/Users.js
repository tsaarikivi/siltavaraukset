import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchUsers, usersRefOff } from '../../actions/users'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'

import User from './User'


class Users extends Component {
  state = {
    search: ''
  }

  componentDidMount() {
    this.props.actions.fetchUsers()
  }

  componentWillUnmount() {
    usersRefOff()
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return <div className="admin-list-container small-container">
      <Subheader className="subheader-centered">Käyttäjät</Subheader>
      <Paper zDepth={1} className="input-container form">
        <TextField
          value={this.state.search}
          onChange={e => this.handleChange(e)}
          type="search"
          hintText="Haku emaililla"
          fullWidth={true}
          />
      </Paper>
      {this.renderUsers()}
    </div>
  }

  renderUsers() {
    const { search } = this.state
    // if no search show nothing
    if (search === '') return null

    const { users } = this.props
    let ret = []

    // set users items who include search word
    for (let user in users) {
      if (users.hasOwnProperty(user)) {
        let u = users[user]
        if (u.email.toLowerCase().includes(search.toLowerCase())) {
          ret.push(<User key={u.uid} user={u} />)
        }
      }
    }

    return ret
  }
}

function mapStateToProps({ users }) {
  return { users }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchUsers }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)