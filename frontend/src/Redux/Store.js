
import {createStore,applyMiddleware} from "redux";
import {RootReducers} from './Rootreducer';



 export const Store = createStore( RootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

 export default Store ;
