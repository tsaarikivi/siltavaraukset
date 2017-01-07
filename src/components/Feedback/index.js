import React from 'react'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import List, { ListItem } from 'material-ui/List'
// import FeedbackForm from './FeedbackForm' <FeedbackForm />

import './styles.css'

const Feedback = () => {
  return <div className="small-container">
    <Paper zDepth={1}>
      <List>
        <Subheader>Yhteystiedot</Subheader>
        <Divider />
        <ListItem>Tallbergin puistotie 7A, 00200 Helsinki</ListItem>
        <ListItem>Tuula Heiskanen & Hanna Lampen</ListItem>
        <ListItem>joogakoulusilta@gmail.com</ListItem>
        <ListItem>puh. 050 443 3370</ListItem>
      </List>
    </Paper>
  </div>
}

export default Feedback