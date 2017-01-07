import React from 'react'

import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'

// import send feedback

const FeedbackForm = () => {
  return <Paper className="form" zDepth={1}>
    <form>
      <Subheader>Palaute</Subheader>
      <Divider />
      <div className="input-container">
        <TextField
          className="input-inset"
          hintText="Kirjoita palaute tähän"
          multiLine={true}
          rows={1}
          rowsMax={4}
          fullWidth={true}
          />
        <div className="form-buttons">
          <RaisedButton className="form-button" type="submit" label="Lähetä palaute" />
        </div>
      </div>
    </form>
  </Paper>
}

export default FeedbackForm