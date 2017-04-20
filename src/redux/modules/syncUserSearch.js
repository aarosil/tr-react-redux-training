import users from './userDb';

const initialState = {
  results: [],
  searchKey: 'name'
}

const SEARCH = 'SEARCH';
const CHANGE_KEY = 'CHANGE_KEY';

export default function userSync(state = initialState, action) {
  switch (action.type) {

    case CHANGE_KEY:
      return {
        ...state,
        searchKey: action.key
      };

    case SEARCH:
      const results = action.query.length
        ? users.filter(user => user[state.searchKey].includes(action.query))
        : []

      return {
        ...state, results
      };

    default:
      return state;
  }
};

export const performSearch = query => ({
  type: SEARCH,
  query
});

export const thunkPerformSearch = query => (dispatch, getState) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(dispatch(performSearch(query)));
    }, 250)
  });