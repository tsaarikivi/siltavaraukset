import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'

import { createCourse } from '../../actions/courses'

class CourseForm extends Component {
  state = {
    title: '',
    desc: '',
    teacher: '',
    startTime: null,
    endTime: null,
    date: null,
    maxCapacity: 12
  }

  handleChange(e, type) {
    let state = {}
    state[type] = e.target.value
    this.setState(state)
  }

  handleDateChange(e, date, type) {
    let state = {}
    state[type] = date
    this.setState(state)
  }

  handleSubmit(e) {
    e.preventDefault()
    createCourse(this.state)
  }

  render() {
    const {title, desc, teacher, startTime, endTime, date, maxCapacity } = this.state
    return <div className="admin-list-container small-container">
      <Subheader className="subheader-centered">Uusi tunti</Subheader>
      <Paper className="form" zDepth={1}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <Divider />
          <div className="input-container">
            <TextField
              floatingLabelText="Nimi"
              value={title}
              onChange={e => this.handleChange(e, 'title')}
              floatingLabelFixed={true}
              fullWidth={true}
              type="text"
              />
            <TextField
              floatingLabelText="Kuvaus"
              value={desc}
              onChange={e => this.handleChange(e, 'desc')}
              floatingLabelFixed={true}
              multiLine={true}
              rows={1}
              rowsMax={4}
              fullWidth={true}
              />
            <TextField
              floatingLabelText="Opettaja"
              value={teacher}
              onChange={e => this.handleChange(e, 'teacher')}
              floatingLabelFixed={true}
              fullWidth={true}
              type="text"
              />
            <TextField
              floatingLabelText="Maksimi oppilasmäärä"
              value={maxCapacity}
              onChange={e => this.handleChange(e, 'maxCapacity')}
              floatingLabelFixed={true}
              fullWidth={true}
              type="number"
              />
            <DatePicker
              hintText="Pvm"
              value={date}
              onChange={(e, date) => this.handleDateChange(e, date, 'date')}
              fullWidth={true}
              />
            <TimePicker
              format="24hr"
              hintText="Alkaa klo"
              value={startTime}
              onChange={(e, date) => this.handleDateChange(e, date, 'startTime')}
              fullWidth={true}
              />
            <TimePicker
              format="24hr"
              hintText="Päättyy klo"
              value={endTime}
              onChange={(e, date) => this.handleDateChange(e, date, 'endTime')}
              fullWidth={true}
              />
            <div className="form-buttons">
              <RaisedButton className="form-button" type="submit" label="Luo" />
            </div>
          </div>
        </form>
      </Paper>
    </div>
  }
}

export default CourseForm