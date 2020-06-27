import React from "react";
import Notification from "./notification";
import ProjectList from "../projects/projectList";
import { connect } from "react-redux";
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
// this firestoreconnect helps us to connect this component to the collections we created in firestore;
//we use Redirect to redirect to another component

class Dashboard extends React.Component {
    render() {
        const { projects,auth,notifications } = this.props;
        // here we did destructuring so instead of this.props.projects we can just say project
        if(!auth.uid) return <Redirect to='/signIn'/>
        //here we checked if the auth has uid and said if  not i.e!auth.uid redirect to signIn component,
        //note uid is only present when the user is authenticated i.e when the has signed up already
        /*in a nut shell we are saying this dashboard componenet should not show for the user that has not signedIn, 
        thats why we redirect them to the signIn component*/
        
        console.log(projects);
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 l6  section">
                        <ProjectList projects={projects} />
                        {/*we pass the project prop as a prop to projectList componenet so we can access there */}
                    </div>
                    <div className="col s12 l5 offset-l1  section">
                        <Notification notifications={notifications} />
                            {/*we pass the notification prop as a prop to notification componenet so we can access there */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    // console.log(state)
    return {
        projects: state.firestore.ordered.projects,
        auth:state.firebase.auth,
        notifications:state.firestore.ordered.notifications
    }
}
 ;
// note: initially we said state.project.projects cos the first project access the project property initially
// in the rootReducer, while the projects now access the projects in projectReducer that connects to the rootReducer
// so project is now our prop.
/*after connecting to our firestore project collection, we no longer need the dummy data in our initial states
so we now we changed state.project.projects to  state.firestore.ordered.projects to get array of the projects we created in the project collection in firestore,
we also did the same thing for the colloection*/
//we also accessed the auth propeprty in our state in firebase
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'projects',orderBy:['createdAt','desc']},
        {collection:'notifications',orderBy:['time','desc'],limits:3, }
    ])
)(Dashboard);
/*the firestoreConnect accepts an array of objects. 
this object specify which collection in firestore we want to use when this component is active
here we want to use the projects and notifications collection,
note in the notification object we also added 
limits property=we use this to set the number of notification to show
orderBy this is for ordering the projects and notification. it takes an array, the first item specify what to order by, the second i.e desc means descending order i.e 
the recent one will be above.
note: we use createdAt for project, time for notification, this is bcos it is createdAT we used for specifying d time d project was created
but we used time when specifying when the notification was created */

// we used compose to use more than one higher order componenet