import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import "materialize-css/dist/css/materialize.min.css/";
import { createStore, applyMiddleware,compose} from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from 'redux-thunk'
import {reduxFirestore,getFirestore} from 'redux-firestore'
import {reactReduxFirebase,getFirebase} from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig,{useFirestoreForProfile:true,userProfile:'users',attachAuthIsReady:true})
    )
);

/*note useFirestoreForProfile helps us get a users profile from firestore datatbase, i.e d user firstName, lastName etc
userProfile helps us specify which collection in the database to get it from. 
both of the property makes the user profile now availabe to our state in firebase*/

store.firebaseAuthIsReady.then(()=>{
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById("root")
);
})

/*we used attachAuthIsReady and store.firebaseAuthIsReady to ensure that the firebase auth is ready before rendeing to d DOM */

/*Note: thunk is a Middleware, it allows us to return a function inside our actionCreators
 with th applymiddleware function from our redux we can add other middleware.middle ware gives
 our store extra functionality*/

 /*compose is a redux function that enables us to use   many higher order component such as store enhancers (applyMiddleware is one of them)
    reduxFirestore and reactReduxFirebase are also store enhancers
 */