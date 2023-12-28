import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducer/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const gstore = createStore(persistedReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(gstore);

export {gstore, persistor};

// import {createStore, applyMiddleware, combineReducers} from 'redux';
// // import {reducerLogin} from './reducer/authReducer';
// import rootReducer from './reducer/rootReducer';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

// const reducer = rootReducer;
// // var reducer = combineReducers({
// //   login: reducerLogin,
// // });

// var gstore = createStore(reducer, applyMiddleware(thunk, logger));
// export default gstore;
