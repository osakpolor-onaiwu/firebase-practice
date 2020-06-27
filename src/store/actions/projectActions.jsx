export const createProject = (project) => {
    return (dispatch, getState, {getFirebase,getFirestore}) => {
        //make call to database
        const firestore=getFirestore();
        // this gives us access to the collection (projects) that we created in firestore
        const profile=getState().firebase.profile;
        //we are getting the profile object proerty in firebase
        const authorId=getState().firebase.auth.uid
        //here we are getting the auth property and then the uid property inside the auth property in our state
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName:profile.lastName,
            authorId:authorId,
            createdAt:new Date()
        }).then(()=>{
            dispatch({type: "CREATE_PROJECT", project: project});
            }).catch((err)=>{
                dispatch({type: 'CREATE_PROJECT_ERROR',err:err})
            })
        
        /*here we are adding the project (i.e title and content property we got from createProject component state) 
        to the projects collection we created in firestore.
        we also added some property to the object
        this is like creating a new project document in the project collection in firestore.
         each property here is a field ind the document*/

         /*to create the document in the firestore will take sometime, thus it is a promise.
         so we said if it is now complete, before the action we want to dispatch
         will fire, if the promise fails, we added a .catch method to dispatch another 
         that shows the error */
       
    };
    // note we can return a function here because we used thunk to enhance our StorageEvent.
    // thunk helps us pause the action dispatch until we have gotten the data from the database
    // the project we are using here was gotten from the action dispatch from the CreateProject component
};
/*note: getState is used to get our state in firebase, when we connect our app to firebase, 
we then use firebase state not just our initial state in our root reducer.
in the state in firebase we have different properties such as auth,profile,firestore, data,ordered etc, 
each of those property is an object on their own, so they have their own properties too*/