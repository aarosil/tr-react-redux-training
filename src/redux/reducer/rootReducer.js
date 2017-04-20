import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import sync, { syncEpic } from '../modules/syncUserSearch';

export default combineReducers({
  sync
});

export const rootEpic = combineEpics(
  syncEpic
);