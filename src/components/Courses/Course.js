import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ListItem } from 'material-ui/List'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'
import { blue500, red500, green500 } from 'material-ui/styles/colors'

import { makeReservation, undoReservation } from '../../actions/courses'

export default class Course extends Component {
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

  // opens dialog in index.js
  handleDialog = () => {
    this.handleRequestClose()
    this.props.openDialog(this.props.course)
  }

  // renders a course
  render() {
    const { course: { title, time } } = this.props
    return <div>
      <Divider></Divider>
      <ListItem
        onTouchTap={this.handleTouchTap}
        primaryText={title}
        secondaryText={<span>
          {time}
          <br />
          {this.renderSeconary()}
        </span>}
        secondaryTextLines={2}
        rightIcon={this.renderRightIcon()}
        />
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
        onRequestClose={this.handleRequestClose}
        >
        {this.renderMenu()}
      </Popover>
    </div>
  }

  // returns a badge icon for the course
  renderRightIcon() {
    const { course: { cancelled, full, reserved, inPast } } = this.props
    let icon = null
    if (cancelled) icon = <FontIcon color={red500} className="material-icons">warning</FontIcon>
    else if (inPast) icon = <FontIcon className="material-icons">call_missed</FontIcon>
    else if (reserved) icon = <FontIcon color={green500} className="material-icons">face</FontIcon>
    else if (full) icon = <FontIcon color={blue500} className="material-icons">block</FontIcon>
    return icon
  }

  // returns a string as course capacity
  renderSeconary() {
    const { course: { cancelled, full, capacity, maxCapacity } } = this.props
    let text = ''
    if (cancelled) text = 'Peruttu'
    else if (full) text = 'Täynnä'
    else text = `${capacity} / ${maxCapacity}`
    return text
  }

  // renders course menu
  renderMenu() {
    return <Menu>
      {this.renderReservationButton()}
      <MenuItem primaryText="Lisätiedot" onTouchTap={() => this.handleDialog()} />
    </Menu>
  }

  makeReservation() {
    this.handleRequestClose()
    const { course, user } = this.props
    makeReservation({ course, user })
  }

  undoReservation() {
    this.handleRequestClose()
    const { course, user } = this.props
    undoReservation({ course, userId: user.uid })
  }

  // renders course menu reserve row
  renderReservationButton() {
    const { course: { full, cancelled, reserved, inPast, starting }, user } = this.props
    let btn = null
    if (!user) btn = <MenuItem onTouchTap={() => browserHistory.push('/login')} primaryText="Kirjaudu Varataksesi" />
    else if (inPast) btn = null
    else if (cancelled) btn = null
    else if (reserved && starting) btn = null
    else if (reserved) btn = <MenuItem onTouchTap={() => this.undoReservation()} primaryText="Peruuta Varaus" />
    else if (!full && starting) btn = <MenuItem onTouchTap={() => this.makeReservation()} primaryText="Varaa (ei peruutusta)" />
    else if (!full && !cancelled) btn = <MenuItem onTouchTap={() => this.makeReservation()} primaryText="Varaa" />
    return btn
  }
}