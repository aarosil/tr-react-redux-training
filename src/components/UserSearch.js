import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../redux/modules/syncUserSearch';
import UserGithubDetail from './UserGithubDetail';

export class UserSearch extends Component {
  render() {
    const { results, user, setQuery, updateKey, searchKey, query, loading, selectUser, selectedUser } = this.props;

    return (
      <div>
        <h4>
          User Search
        </h4>
        <div>
          <label>search users</label>
          <input onChange={e => setQuery(e.target.value)} type='text' value={query}/>
          <select onChange={e => updateKey(e.target.value)} value={searchKey}>
            {
              ['name', 'github', 'interests', 'all']
                .map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
            }
          </select>
        </div>
        {
          loading ? (
            <div>loading....</div>
          ) : (
            <div>
            {
              !!user && <img src={user.picture.thumbnail} alt='rando' />
            }
            {
              results.map((result, index) => (
                <div key={index} onClick={e => selectUser(result)}>
                  <span>{result.name}:</span>
                  <span style={{fontStyle: 'italic'}}>
                    {JSON.stringify(searchKey === 'all' ? result : result[searchKey], null, 2)}
                  </span>
                </div>
              ))
            }
            </div>
          )
        }
        { !!selectedUser && <UserGithubDetail username={selectedUser.github}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { results = [], user, searchKey, query, loading, selectedUser } = state.sync;
  return {results, user, searchKey, query, loading, selectedUser};
};

export default connect(mapStateToProps, userActions)(UserSearch);