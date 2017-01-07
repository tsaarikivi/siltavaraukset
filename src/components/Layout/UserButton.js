import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import { signOut } from '../../actions/auth'

export default class UserButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  // opens popover
  handleTouchTap = (event) => {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  // closes popover
  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    return <IconButton onTouchTap={this.handleTouchTap}>
      <FontIcon className="material-icons" color="white">{this.renderIcon()}</FontIcon>
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.handleRequestClose}
        >
        {this.renderMenu()}
      </Popover>
    </IconButton>
  }

  signIn() {
    this.handleRequestClose()
    browserHistory.push('/login')
  }

  signOut() {
    this.handleRequestClose()
    signOut()
  }

  redirectUser() {
    this.handleRequestClose()
    browserHistory.push('/user')
  }

  renderMenu() {
    const { user } = this.props
    let menu = null
    if (user) menu = <Menu>
      <MenuItem onTouchTap={() => this.redirectUser()} primaryText="Käyttäjätiedot" />
      <MenuItem onTouchTap={() => this.signOut()} primaryText="Kirjaudu ulos" />
    </Menu>
    else menu = <Menu>
      <MenuItem onTouchTap={() => this.signIn()} primaryText="Kirjaudu sisään" />
    </Menu>
    return menu
  }

  renderIcon() {
    const {user} = this.props
    if (user) return 'face'
    return 'vpn_key'
  }
}