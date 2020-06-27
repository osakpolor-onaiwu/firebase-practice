const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp(functions.config().firebase)


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello Osas!");
});

const createNotification=((notification)=>{
    return admin.firestore().collection('notifications').add(notification)
    .then((doc)=>{
        return console.log('notification added',doc)
    })
})



exports.projectCreated= functions.firestore.document('projects/{projectId}').onCreate((doc)=>{
    const project=doc.data() 
    const notification={
        content:'Added a new project',
        user:`${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
})

exports.userJoined= functions.auth.user().onCreate((user)=>{
    return admin.firestore().collection('users').doc(user.uid).get()
    .then((doc)=>{
        const newUser=doc.data();
        const notification={
            content:'signed up',
            user: `${newUser.firstName} ${newUser.lastName}`,
            time:admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
    })
})




/*we created a variable admin, and then initialized it. this allows us to interact with firstore and authentication service in firebase */

/*for function 1 the trigger is when an http request is made
  for function 2 that we created, we say that d trigger is an onCreate, ie when a document is created in d projects collection in firestore */

/*for function 2 i.e projectCreated, we assigned doc.data() to project. we can do this cos we have access to our documents in our project collection in
firestore. NOTE: remember when a user creates a project it is added to the project collection and each document in the collection
 has the authorFirstName, initials,authorLastName so we have access to all that now and we are useing them in our notification object we created.
 note in time in the notification object we said admin.firestore ...... this helps us get the time it was created*/

/* for function 3 i.e userJoined, we said that whne a user signs up/is created and is authenticated(note it is the auth service in firebase that is in charge of new ursers) 
then, we should get a document that corresponds with the user that just joined user.uid, 
note  remember that when user is authenticated in the auth serevic a document is created  for the user in the users collection in firestore, 
and the id of that doucment matches that of the user uid (in short the user uid is the id for his document in theu users collection);
 so we are saying get the document for the user we just created from the users collectin in firestore.
 then assign the data in that doc to newUser variable.
 then we created a notification object and used the firstName and lastName of the user. note we have access to this cos they are in the doc data
 we then called the createNotification function we created above and pass this notification to it as a parameter.
*/

/*note we created an extra function that we did not import, that function helps us create a notification collection in firestore, note if there
was such collections before then the fields we supplied when we called the createNotification function inside projectCreated  function, will be used
to add a new document. but since we did not have the collection before, firestore will help us create it and popupulated it with with notification documents any
time a project is created  */

/*the first function runs on firebase when a request is made. it is simply saying when an http request is made to a link that will show after deploying this app
, then this function should run, and then the response Hello Osas should be sent to who made the request*/