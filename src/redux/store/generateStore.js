import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import rootReducer, { rootEpic } from '../reducer/rootReducer';
;
const epicMiddleware = createEpicMiddleware(rootEpic);

export default function generateStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(epicMiddleware)
    )
  );
}