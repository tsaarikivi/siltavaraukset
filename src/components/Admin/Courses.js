import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import CircularProgress from 'material-ui/CircularProgress'

import Course from './Course'

import { fetchCourseData, coursesRefOff, getAdminMin, getAdminMax, cleanUpCourses } from '../../actions/courses'

class Courses extends Component {
  state = {
    search: ''
  }

  componentDidMount() {
    this.props.actions.fetchCourseData(getAdminMin, getAdminMax)
    cleanUpCourses()
  }

  /*
    componentWillReceiveProps(nextProps) {
      // if user state changes must sell action again
      if (this.props.user !== nextProps.user) {
        this.props.actions.fetchCourseData(getAdminMin, getAdminMax)
      }
    }
    */

  componentWillUnmount() {
    coursesRefOff()
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return <div className="admin-list-container small-container">
      <Subheader className="subheader-centered">Tunnit</Subheader>
      <Paper zDepth={1} className="input-container form">
        <TextField
          value={this.state.search}
          onChange={e => this.handleChange(e)}
          type="search"
          hintText="Haku otsikolla"
          fullWidth={true}
          />
      </Paper>
      {this.renderCourses()}
    </div>
  }

  renderCourses() {
    const { search } = this.state

    const { courses } = this.props

    let ret = []

    // set users items who include search word
    for (let d in courses) {
      if (courses.hasOwnProperty(d)) {
        let day = courses[d]

        const dcourses = day.courses
        for (let course in dcourses) {
          if (dcourses.hasOwnProperty(course)) {
            let c = dcourses[course]
            c.day = d
            c.kingText = this.craftKingText(c)
            if (c.kingText.toLowerCase().includes(search.toLowerCase())) {
              ret.push(<Course key={c.uid} course={c} />)
            }
          }
        }
      }
    }
    if (ret.length === 0) {
      return <div className="loading" >Ei hallittavia tunteja</div>
    }
    return ret
  }

  craftKingText({title, day, time, cancelled}) {
    let canc = 'Avoin'
    if (cancelled) canc = 'Peruttu'
    return `${title} | ${day} | ${time} | ${canc}`
  }
}

function mapStateToProps({ courses, user }) {
  return { courses, user }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchCourseData }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)