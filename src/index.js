import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import generateStore from './redux/store/generateStore';
import App from './App';

const store = generateStore();

const component = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  component,
  document.getElementById('root')
);
