import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import BurgerReducer from "./store/reducers/BurgerReducer";
import thunk from "redux-thunk";
import { OrderReducer } from "./store/reducers/OrderReducers";
import { AuthReducer } from "./store/reducers/AuthReducer";
import createSagaMiddleware from "redux-saga";
import { watcherAuthSaga } from "./store/saga/root";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;
// typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     })
//   : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
  applyMiddleware(logger, thunk, sagaMiddleware)
  // other store enhancers if any
);
const reducers = combineReducers({
  burgerReducer: BurgerReducer,
  orderReducer: OrderReducer,
  authReducer: AuthReducer,
});

const store = createStore(reducers, enhancer);

sagaMiddleware.run(watcherAuthSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
