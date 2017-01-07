import React, { Component } from 'react'
import { fetchCourseData } from '../../actions/courses'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import { List } from 'material-ui/List'
import Course from './Course'

import { coursesRefOff } from '../../actions/courses'

import './styles.css'

class Courses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      title: '',
      desc: '',
      teacher: '',
      reservations: {}
    }
  }

  componentDidMount() {
    this.props.actions.fetchCourseData()
  }

  componentWillUnmount() {
    coursesRefOff()
  }

  handleOpen = ({title, desc, teacher, reservations}) => {
    this.setState({
      open: true,
      title,
      desc,
      teacher,
      reservations
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      title: '',
      desc: '',
      teacher: '',
      reservations: {}
    })
  }

  render() {
    const { title, desc, teacher } = this.state
    return <div>
      <Dialog
        title={title}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        >
        <p><span className="text-black">Opettaja</span><br />{teacher}</p>
        <p><span className="text-black">Tunnin kuvaus</span><br />{desc}</p>
        {this.renderReservations()}
      </Dialog>
      <Subheader className="subheader-centered">Aikataulu</Subheader>
      {this.renderCourses()}
    </div>
  }

  renderCourses() {
    const { courses } = this.props
    let ret = []
    for (let day in courses) {
      if (courses.hasOwnProperty(day)) {
        ret.push(
          <Paper key={day} zDepth={1} className="course-day">
            <List>
              <Subheader>{courses[day].weekday} {day}</Subheader>
              {this.renderCourse(courses[day].courses)}
            </List>
          </Paper>
        )
      }
    }
    return ret
  }

  renderCourse(courses) {
    const { user } = this.props
    let ret = []
    for (let course in courses) {
      if (courses.hasOwnProperty(course)) {
        ret.push(<Course key={course} course={courses[course]} openDialog={this.handleOpen} user={user} />)
      }
    }
    return ret
  }

  renderReservations() {
    const { user } = this.props
    if (user) {
      if (user.admin) {
        const { reservations } = this.state
        let ret = []
        for (let res in reservations) {
          if (reservations.hasOwnProperty(res)) {
            ret.push(<li key={res}>{reservations[res]}</li>)
          }
        }
        return <ul>
          <span className="text-black">Osallistujat</span>
          {ret}
        </ul>
      }
    }
    return null
  }
}

function mapStateToProps({ courses, user }) {
  return { courses, user }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchCourseData }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)