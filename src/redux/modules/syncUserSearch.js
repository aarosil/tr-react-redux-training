import users from './userDb';
import axios from 'axios';

const initialState = {
  results: [],
  searchKey: 'name'
}

const SEARCH = 'SEARCH';
const CHANGE_KEY = 'CHANGE_KEY';
const RANDO = 'RANDO';

const searchUsers = (query, key) => users.filter(user => user[key].includes(query))

const calculateResults = (state, action) =>
  state.searchKey === 'all'
    ? users
        .filter(user =>
          Object.keys(user)
            .filter(prop =>
              user[prop] instanceof Array
                ? user[prop].some(item => item.includes(action.query))
                : user[prop].includes(action.query)
            )
            .length
        )
    : searchUsers(action.query, state.searchKey)

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
      return {
        ...state,
        results: calculateResults(state, action)
      };

    default:
      return state;
  }
};

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
