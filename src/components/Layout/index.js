import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'

import './styles.css'

// iconElementRight={<AuthBtn logged={this.state.logged} />}

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  handleToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen })

  handleMenuClick = (route) => {
    this.handleToggle()
    browserHistory.push(route)
  }

  render() {
    const { children } = this.props
    return <div>
      <AppBar
        title="Joogakoulu Silta"
        onLeftIconButtonTouchTap={() => this.handleToggle()}
        />
      <Drawer
        docked={false}
        open={this.state.drawerOpen}
        onRequestChange={drawerOpen => this.setState({ drawerOpen })}>
        <AppBar title="Valikko" showMenuIconButton={false} />
        <MenuItem primaryText="Admin" onTouchTap={() => this.handleMenuClick('/admin')} leftIcon={<FontIcon className="material-icons">person</FontIcon>}></MenuItem>
        <MenuItem primaryText="Tunnit" onTouchTap={() => this.handleMenuClick('/')} leftIcon={<FontIcon className="material-icons">assignment</FontIcon>}></MenuItem>
        <MenuItem primaryText="Käyttäjä" onTouchTap={() => this.handleMenuClick('/user')} leftIcon={<FontIcon className="material-icons">face</FontIcon>}></MenuItem>
        <MenuItem primaryText="Kauppa" onTouchTap={() => this.handleMenuClick('/shop')} leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>}></MenuItem>
        <MenuItem primaryText="Yhteystiedot & palaute" onTouchTap={() => this.handleMenuClick('/feedback')} leftIcon={<FontIcon className="material-icons">feedback</FontIcon>}></MenuItem>
      </Drawer>
      <div className="content-container">
        {children}
      </div>
    </div>
  }
}