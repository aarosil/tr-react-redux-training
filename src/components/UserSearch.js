import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../redux/modules/syncUserSearch';

export class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({loading: true});
    this.props.thunkPerformSearch(this.input.value)
      .then(() => this.setState({loading: false}));
  }

  render() {
    const { results, user, updateKey, searchKey } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h4>
          User Search
        </h4>
        <div>
          <label>search users</label>
          <input ref={el => this.input = el} onChange={this.handleChange} type='text' defaultValue='' />
          <select onChange={e => updateKey(e.target.value, this.input.value)} value={searchKey}>
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
                <div key={index}>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { results = [], user, searchKey } = state.sync;
  return {results, user, searchKey};
};

export default connect(mapStateToProps, userActions)(UserSearch);