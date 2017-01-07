import { Component } from 'react'
import { fetchUser } from '../../actions/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Auth extends Component {
  componentDidMount() {
    this.props.actions.fetchUser()
  }
  render() { return null }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchUser }, dispatch) }
}

export default connect(null, mapDispatchToProps)(Auth)