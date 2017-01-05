import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Layout from './components/Layout'
import {
  lightBlue500, lightBlue700, deepOrange500
} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
    accent1Color: deepOrange500,
    pickerHeaderColor: lightBlue700
  }
})

const App = ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Layout children={children} />
  </MuiThemeProvider>
)

export default App