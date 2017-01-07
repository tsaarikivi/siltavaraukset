import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import FontIcon from 'material-ui/FontIcon'
import Snackbar from 'material-ui/Snackbar'

import UserButton from './UserButton'
import Auth from '../Auth'

import { closeSnackbar } from '../../actions/snackbar'

import './styles.css'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  handleRequestClose = () => {
    this.props.actions.closeSnackbar()
  }

  handleToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen })

  handleMenuClick = (route) => {
    this.handleToggle()
    browserHistory.push(route)
  }

  handleRedirect(route) {
    this.handleToggle()
    window.open(route, '_blank')
  }

  render() {
    const { children } = this.props
    return <div>
      <Auth />
      {this.renderAppBar()}
      {this.renderDrawer()}
      {this.renderSnackBar()}
      <div className="content-container">
        {children}
      </div>
    </div>
  }

  renderAppBar() {
    const { user } = this.props
    return <AppBar
      title="Joogakoulu Silta"
      onLeftIconButtonTouchTap={() => this.handleToggle()}
      iconElementRight={<UserButton user={user} />}
      />
  }

  renderDrawer() {
    return <Drawer
      docked={false}
      open={this.state.drawerOpen}
      onRequestChange={drawerOpen => this.setState({ drawerOpen })}>
      <AppBar title="Valikko" showMenuIconButton={false} />
      {this.renderMenu()}
    </Drawer>
  }

  renderSnackBar() {
    const { message, open } = this.props.snackbar
    return <Snackbar
      open={open}
      message={message}
      autoHideDuration={4000}
      onRequestClose={this.handleRequestClose}
      />
  }

  renderMenu() {
    return <Menu>
      {this.renderAdmin()}
      <MenuItem primaryText="Aikataulu" onTouchTap={() => this.handleMenuClick('/')} leftIcon={<FontIcon className="material-icons">assignment</FontIcon>}></MenuItem>
      <MenuItem primaryText="Kauppa" onTouchTap={() => this.handleRedirect('https://holvi.com/shop/4Z4CW4/')} leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>}></MenuItem>
      <MenuItem primaryText="Yhteystiedot" onTouchTap={() => this.handleMenuClick('/feedback')} leftIcon={<FontIcon className="material-icons">feedback</FontIcon>}></MenuItem>
    </Menu>
  }

  renderAdmin() {
    const { user } = this.props
    let item = null
    if (user) {
      if (user.admin)
        item = <MenuItem primaryText="Admin" onTouchTap={() => this.handleMenuClick('/admin')} leftIcon={<FontIcon className="material-icons">person</FontIcon>}></MenuItem>
    }
    return item
  }
}

function mapStateToProps({ user, snackbar }) {
  return { user, snackbar }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ closeSnackbar }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)