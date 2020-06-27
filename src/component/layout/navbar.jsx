import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLink from './signedinLinks'
import SignedOutLink from './signedoutLinks'
import {connect} from 'react-redux'
//note we are using connect here because the database in firestore is already sync with our 
//redux store so we have access to the in our redux store and can use it here

 
const Navigation=({auth,profile})=>{
    //we destructured the auth  and profile props
    const links=auth.uid?<SignedInLink profile={profile}/>:<SignedOutLink/>
    /*here we check if the auth has the uid(this is an id that is present wnen the user is logged in)
    but absent if logged out. if it is present then the navbar should display the singed in component
    if absent the signed out component should show.*/

    /*we then passed the profile as props to siggned in component so we can use it there*/
    return(
    <nav>
        <div className="nav-wrapper red darken-4">
        <div className="container">
          <Link to="/" class="brand-logo">Logo</Link>
            {links}
        </div>
        </div>
    </nav>
    )
}

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile:state.firebase.profile
    }
//we are accessing the auth property from the state in firebase
/*since in index.js we now have access to the user profile in firestore,
we can then access that profile in our state in firebase
*/
}
export default connect(mapStateToProps)(Navigation)