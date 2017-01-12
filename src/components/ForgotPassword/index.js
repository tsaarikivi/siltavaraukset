import React, { Component } from 'react'
import { forgotPassword } from '../../actions/auth'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

export default class ForgotPassword extends Component {

  state = {
    email: ''
  }

  handleChange(e, type) {
    let state = {}
    state[type] = e.target.value
    this.setState(state)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email } = this.state
    forgotPassword(email)
  }

  render() {
    const { email } = this.state
    return <div className="small-container">
      <Subheader className="subheader-centered">Kirjaudu tai rekisteröidy</Subheader>
      <Paper className="form" zDepth={1}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <Divider />
          <div className="input-container">
            <div className="info-container">
              <p>Anna tähän käyttäjäsi sähköposti.</p>
              <p>Lähetämme sähköpostiosoitteeseen salasananvaihto-ohjeet.</p>
            </div>
            <TextField
              floatingLabelText="Sähköposti"
              value={email}
              onChange={e => this.handleChange(e, 'email')}
              floatingLabelFixed={true}
              fullWidth={true}
              type="email"
              />
            <div className="form-buttons">
              <RaisedButton className="form-button" type="submit" label="Lähetä" />
            </div>
          </div>
        </form>
      </Paper>
    </div>
  }
}
