import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import sync, { syncEpic } from '../modules/syncUserSearch';
import github, { githubEpic } from '../modules/github';

export default combineReducers({
  sync,
  github
});

export const rootEpic = combineEpics(
  syncEpic,
  githubEpic
);