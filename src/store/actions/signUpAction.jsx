 const signUpAction = (newUser) =>{
    return (dispatch,getState,{getFirebase, getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                initials:newUser.firstName[0] + newUser.lastName[0],
                createdAt:new Date()
            })
        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch((err)=>{
          console.log(err)
            return (dispatch({type:'SIGNUP_FAILED', err:err}))
        })
    }
}

export default signUpAction;

/*here we get the newUser details from the signUp page ie the name, email and passoword.
we then use the auth() method in firebase to create a user using the email and password the user
types in the sign up page.
note: when the user is created in firebase, an id is auto generated ther, it is called user.uid,
this is a promise (ie creating the user) and it takes time, we then said when it is complete,
then we said firestore should create a new collection called Users, then it should
take the user.uid from the response we get after creation of the user in firebase, and then create
a new document in the user collection. so this document will have this id as its id,(this ensure
each user has an id that correspond to their id in the authentication )
we then also added other fields to the document i.e the newuser firstName, lastName and their
initials. this process is repeated for every user that signs up.
note: firstName[0] means take the first character of the name the user enters */

/*after creating the user and everything, we then also use another .then to dispatch the action */
