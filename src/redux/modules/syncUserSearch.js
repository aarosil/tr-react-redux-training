import users from './userDb';
import axios from 'axios';

const initialState = {
  results: [],
  searchKey: 'name'
}

const SEARCH = 'SEARCH';
const CHANGE_KEY = 'CHANGE_KEY';
const RANDO = 'RANDO';

export default function userSync(state = initialState, action) {
  switch (action.type) {

    case CHANGE_KEY:
      return {
        ...state,
        searchKey: action.key
      };

    case RANDO:
      return {
        ...state,
        user: action.rando
      }

    case SEARCH:
      const results = action.query.length
        ? users.filter(user => user[state.searchKey].includes(action.query))
        : []
      return {
        ...state,
        results
      };

    default:
      return state;
  }
};

export const performSearch = query => ({
  type: SEARCH,
  query
});

const updateRando = rando => ({
  type: RANDO,
  rando
})

const getRandomUser = () => (dispatch, getState) =>
  axios.get('https://randomuser.me/api')
    .then(({data}) => dispatch(updateRando(data.results[0])))


export const thunkPerformSearch = query => (dispatch, getState) =>
  dispatch(getRandomUser())
    .then(() => dispatch(performSearch(query)))
