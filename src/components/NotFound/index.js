import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

const NotFound = () => {
  return <div className="not-found">
    <p>Sivua ei löytynyt</p>
    <RaisedButton onTouchTap={() => browserHistory.push('/')} label="Takaisin kotiin" />
  </div>
}

export default NotFound