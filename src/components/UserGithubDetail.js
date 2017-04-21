import React, { Component } from 'react';
import * as githubActions from '../redux/modules/github';
import { connect } from 'react-redux';

export class UserGithubDetail extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.username);
  }

  componentDidUpdate(prevProps) {
    const {loadUser, username} = this.props;
    const {username: previousUsername} = prevProps;
    if (username !== previousUsername) {
      loadUser(username);
    }
  }

  render() {
    const { username, user } = this.props

    return (
      <div>
        <h5>{`details for ${username}`}</h5>
        <img height='50' src={user.avatar_url} alt='github avatar' />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps;
  const { byLogin } = state.github;
  const user = byLogin[username.toLowerCase()] || {};
  return {
    user
  }
}

export default connect(mapStateToProps, githubActions)(UserGithubDetail);