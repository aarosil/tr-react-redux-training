import users from './userDb';
import axios from 'axios';

const initialState = {
  results: [],
  searchKey: 'name'
}

const SEARCH = 'SEARCH';
const CHANGE_KEY = 'CHANGE_KEY';
const RANDO = 'RANDO';
const SET_QUERY = 'SET_QUERY';

const searchUsers = (key, query) => users.filter(user => user[key].includes(query))

const calculateResults = (key, query) =>
  key === 'all'
    ? users
        .filter(user =>
          Object.keys(user)
            .filter(prop =>
              user[prop] instanceof Array
                ? user[prop].some(item => item.includes(query))
                : user[prop].includes(query)
            )
            .length
        )
    : searchUsers(key, query)

export default function userSync(state = initialState, action) {
  switch (action.type) {

    case SET_QUERY:
      return {
        ...state,
        query: action.query
      }

    case CHANGE_KEY:
      return {
        ...state,
        searchKey: action.key,
        results: calculateResults(action.key, state.query)
      };

    case RANDO:
      return {
        ...state,
        user: action.rando
      }

    case SEARCH:
      return {
        ...state,
        results: calculateResults(state.searchKey, action.query)
      };

    default:
      return state;
  }
};

export const setQuery = query => ({
  type: SET_QUERY,
  query
})

export const updateKey = key => ({
  type: CHANGE_KEY,
  key
})

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
