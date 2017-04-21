import users from './userDb';
import axios from 'axios';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

const initialState = {
  query: '',
  results: [],
  searchKey: 'name'
}

const CHANGE_KEY = 'CHANGE_KEY';
const RANDO = 'RANDO';
const SET_QUERY = 'SET_QUERY';
const UPDATE_RESULTS = 'UPDATE_RESULTS';
const START_LOAD = 'START_LOAD';
const QUERY_UPDATED = 'QUERY_UPDATED';

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

    case START_LOAD:
      return {
        ...state,
        loading: true
      }

    case SET_QUERY:
      return {
        ...state,
        query: action.query
      }

    case CHANGE_KEY:
      return {
        ...state,
        searchKey: action.key
      };

    case RANDO:
      return {
        ...state,
        user: action.rando,
        loading: false
      }

    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.results
      }

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

const getRando = () => axios.get('https://randomuser.me/api');

const updateQueryEpic = action$ =>
  action$.ofType(SET_QUERY)
    .debounceTime(250)
    .map(({query}) => (query.length
      ? {type: QUERY_UPDATED, query}
      : {type: UPDATE_RESULTS, results: []}
    ))

const searchEpic = (action$, {getState}) =>
  action$.filter(({type}) => [QUERY_UPDATED, CHANGE_KEY].includes(type))
    .switchMap(() => {
      const {searchKey: key, query} = getState().sync;
      return Observable.merge(
        Observable.of({
          type: UPDATE_RESULTS,
          results: calculateResults(key, query)}),

        Observable.fromPromise(getRando())
          .map(({data}) => ({
            type: RANDO,
            rando: data.results[0]
          }))
      )
      .startWith({type: START_LOAD})
    })

export const syncEpic = combineEpics(
  updateQueryEpic,
  searchEpic
)