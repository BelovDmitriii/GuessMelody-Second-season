import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthAction, fetchQuestionAction } from './store/api-actions';

store.dispatch(fetchQuestionAction);
store.dispatch(checkAuthAction);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store} >
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
