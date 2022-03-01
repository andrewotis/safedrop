import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
//import authenticateSaga from './authenticateSaga';
//import generateKeypairSaga from "./generateKeypairSaga";
import rootReducer from "./rootReducer.js";

const sagaMiddleware = createSagaMiddleware();
const composedEnhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware)
)

const store = createStore(rootReducer, composedEnhancer)
//sagaMiddleware.run(authenticateSaga);
//sagaMiddleware.run(generateKeypairSaga);

export default store;
