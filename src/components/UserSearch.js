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
    const { results } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h4>
          User Search
        </h4>
        <div>
          <label>search users</label>
          <input ref={el => this.input = el} onChange={this.handleChange} type='text' defaultValue='' />
        </div>
        {
          loading ? (
            <div>loading....</div>
          ) : (
            <div>
            {
              results.map((result, index) => (
                <div key={index}>
                  {result.name}
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
  const { results = [] } = state.sync;
  return {results};
};

export default connect(mapStateToProps, userActions)(UserSearch);