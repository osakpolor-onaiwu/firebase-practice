import React from 'react'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

const ProjectDetails=(props)=> {
    const {project,auth}=props
    if (!auth.uid) {return<Redirect to='/signIn'/>}
    // here we did a destructuring so we can say project instead of props.project
    if(project){
      return(
        <div className='container'>
        <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{project.title}</span>
          <div className="divider"></div>
        <p >{project.content}</p>
          <div className="card-action ">
      <div> Posted by {project.authorFirstName} {project.authorLastName}</div>
              <p>{moment(project.createdAt.toDate()).calendar()}</p>
          </div>
         
        </div>
      </div>
    </div>
      )
     
    }else{
      return (
        <div className="container">
          <p>loading projects</p>
        </div>
        )
    }
    //here we used if to say if there is a project, return ...
    //else return loading post. we could have used tenary operator
   
}

const mapStateToProps=(state,ownprops)=>{
  const id=ownprops.match.params.id;
  const projects=state.firestore.data.projects;
  const project=projects? projects[id]:null
  //here we used a tenary operator and said if there are projects, then get us
  //the id of each projects and store that in project variable, but if no project
  //return null
  return{
    project:project,
    auth:state.firebase.auth
    // we then returned an object that assigns the particular project to project property
    //so we have mapped the state project, to the prop project
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      {collection:'projects'}
  ])
) (ProjectDetails)
//firestoreConnect allows us to connect to our collections in firestore and get the project collection there

/*note here we said state.firestore.data.projects unlike in dashboard that we said
state.firestore.ordered.project. in the firestore state we have both the ordered
object and also the data, but here we choose to use data */

