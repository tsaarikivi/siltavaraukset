import React, { Component } from 'react'
import { connect } from 'react-redux'

import FontIcon from 'material-ui/FontIcon'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'

import Users from './Users'
import Courses from './Courses'
import CourseForm from './CourseForm'
import NotFound from '../NotFound'

class Admin extends Component {
  state = {
    selectedIndex: 0,
  }

  render() {
    const { user } = this.props
    if (user) {
      if (user.admin) {
        return this.renderAdmin()
      }
    }
    return <NotFound />
  }

  select = (index) => this.setState({ selectedIndex: index })

  renderAdmin() {
    return <div className="admin-container">
      <Subheader className="subheader-centered">Admin</Subheader>

      {this.renderPage()}

      <Paper zDepth={1} className="bottom-navigation">
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Käyttäjät"
            icon={<FontIcon className="material-icons">person</FontIcon>}
            onTouchTap={() => this.select(0)}
            />
          <BottomNavigationItem
            label="Tunnit"
            icon={<FontIcon className="material-icons">assignment</FontIcon>}
            onTouchTap={() => this.select(1)}
            />
          <BottomNavigationItem
            label="Uusi Tunti"
            icon={<FontIcon className="material-icons">add</FontIcon>}
            onTouchTap={() => this.select(2)}
            />
        </BottomNavigation>
      </Paper>
    </div>
  }

  renderPage() {
    const { selectedIndex } = this.state
    switch (selectedIndex) {
      case 0: return <Users />
      case 1: return <Courses />
      case 2: return <CourseForm />
      default: return null
    }
  }
}

function mapStateToProps({ user }) {
  return { user }
}

/*
import { bindActionCreators } from 'redux'
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchCourseData }, dispatch) }
}
*/

export default connect(mapStateToProps, null)(Admin)