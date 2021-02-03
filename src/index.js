import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import theme from "./shared/MuiTheme/theme"
import { Provider } from "react-redux"
import thunk from 'redux-thunk';
import authReducer from "./store/reducers/auth"
import snackbarReducer from "./store/reducers/snackbar"
import errorModalReducer from "./store/reducers/errorModal"
import alertModalReducer from "./store/reducers/alertModal"

import shoppiusReducer from "./store/reducers/shoppius.js"
import throttle from "./store/middleware/throttle"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  snack: snackbarReducer,
  errormodal: errorModalReducer,
  alertmodal: alertModalReducer,
  
  shoppius:shoppiusReducer

});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, throttle)));
const persistor = persistStore(store);

const app = (
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
)

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      {app}
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
