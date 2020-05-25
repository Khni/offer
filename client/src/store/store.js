import { createStore, applyMiddleware } from 'redux';
//import index file in reducers
import Reducers from "./reducers" ;
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';






export const store = createStore(Reducers , {}, applyMiddleware(reduxThunk));

export const persistor = persistStore(store);