import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux";
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
// firestoreReducer helps to sync our firestore data base with the firestore state(ie those field we stored in our collection)
// firebaseReducer help to sync our user authentication status to our state in redux store. hence we can know if a user is logged in our not
// note: combineReducers is function that enables us combine many reducer in one


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;
