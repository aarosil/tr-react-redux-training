import { combineEpics } from 'redux-observable';
import axios from 'axios';

const initialState = {
  byLogin: {}
};

const LOAD_USER = 'LOAD_USER';
const LOAD_USER_RESPONSE = 'LOAD_USER_RESPONSE';
// const LOAD_USER_ERROR = 'LOAD_USER_ERROR';

export default function githubReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_RESPONSE:
      return {
        ...state,
        byLogin: {
          ...state.byLogin,
          [action.data.login.toLowerCase()]: {...action.data}
        }
      }
    default:
      return state;
  }
}

export const loadUser = username => ({
  type: LOAD_USER,
  username
});

const fetchGithubUser = username => axios.get(`https://api.github.com/users/${username}`)

const loadGithubUserEpic = (action$, {getState}) =>
  action$.ofType(LOAD_USER)
    .switchMap(({username}) => {
      const data = getState().github.byLogin[username];
      return data
        ? [{data}]
        : fetchGithubUser(username);
    })
    .map(({data}) => ({type: LOAD_USER_RESPONSE, data}))

export const githubEpic = combineEpics(
  loadGithubUserEpic
);