import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

import { signIn } from '../../actions/auth'

import './styles.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(e, type) {
    let state = {}
    state[type] = e.target.value
    this.setState(state)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    signIn({ email, password })
  }

  render() {
    const { email, password } = this.state
    return <div className="small-container">
      <Paper className="form" zDepth={1}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <Subheader className="subheader-centered">Kirjaudu tai rekisteröidy</Subheader>
          <Divider />
          <div className="input-container">
            <div className="info-container">
              <p>Jos käyttäjää ei ole vielä luotu se luodaan tässä</p>
              <p>Jos käyttäjä on luotu se kirjataan sisään</p>
              <p>Rekisteröitymällä hyväksyt käyttöehdot (katso alta)</p>
            </div>
            <TextField
              floatingLabelText="Sähköposti"
              value={email}
              onChange={e => this.handleChange(e, 'email')}
              floatingLabelFixed={true}
              fullWidth={true}
              type="email"
              />
            <TextField
              floatingLabelText="Salasana"
              value={password}
              onChange={e => this.handleChange(e, 'password')}
              floatingLabelFixed={true}
              fullWidth={true}
              type="password"
              />
            <div className="form-buttons">
              <RaisedButton className="form-button" type="submit" label="Kirjaudu / Rekisteröidy" />
              <br />
              <FlatButton className="form-button" secondary={true} label="Unohditko salasanasi?" />
            </div>
          </div>
        </form>
      </Paper>
      <Paper className="form" zDepth={1}>
        <Subheader className="subheader-centered">Käyttöehdot</Subheader>
        <Divider />
        <div className="input-container">
          <div className="info-container padded-bottom">
            <p>Yleiset käyttöehdot: Täältä voit varata paikkasi tunneille ja kursseille! Tunteja voi varata aina viikoksi eteenpäin. Peruutus viimeistään 3 tuntia ennen tunnin alkua. Jos peruutat tuntiosallistumisesi alle 3 tuntia ennen tunnin alkua, kortistasi menee yksi kerta. Korttien ja kurssien peruutukset vain lääkärintodistusta vastaan. Yksityistunti maksettava aina etukäteen ja peruutus tehtävä 1 vuorokausi ennen tuntia, muuten ei rahojen palautusta.</p>
            <p>Paikan päällä käteinen, pankkikortti, yleisimmät luottokortit, Smartum-maksutavat, Sporttipassi ja kaikki Edenredin liikuntapalveluihin tarkoitetut virikesetelit tai Holvi verkkokauppa. Maksamisen jälkeen pystyt aloittamaan tuntien varaukset noin vuorokauden sisään siitä, kun olet rekisteröitynyt siltavaraukset.com'iin.</p>
            <p>Huomioithan, että kurssille paikkasi on vahvistettu vasta sen jälkeen, kun olet sen maksanut verkkokaupassa tai paikan päällä. Kurssi toteutetaan, mikäli osallistujia on min. 5.</p>
            <p>Palveluun talletetaan vain nimi ja sähköpostiosoite. Sähköpostiosoitetta käytetään vain vahvistus- ja tiedotusviestien lähetykseen. Sähköpostitietoja ei luovuteta kolmannelle osapuolelle mitään tarkoitusta varten.</p>
            <p>Oppilas on itse vastuussa omaisuudestaan ja itsestään tunnille tullessaan. Joogakoulu Silta ei ole vakuuttanut oppilaita eikä heidän omaisuuttaan, joten huolehdithan omasta vakuutuksestasi.</p>
          </div>
        </div>
      </Paper>
    </div>
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps, null)(Login)