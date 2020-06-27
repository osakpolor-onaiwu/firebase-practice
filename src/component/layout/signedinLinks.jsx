import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import signOut from '../../store/actions/signOutauthAction'

const SignedInLink = (props) => {
    return (
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
                <a  onClick={props.signOut}>
                    LogOUt
                </a>
            </li>
            <li>
                <NavLink to="/createProject">Create Project</NavLink>
            </li>
            <li>
                <button className="btn-floating btn-large waves-effect waves-light blue darken-4">
                    {props.profile.initials}
                </button>
            </li>
        </ul>
    );
};
//with the profile that was passed from the navbar as props, we accessed the initals of the person, remember this is in our user collection in firestore

// we said onClick should fire the signOut function in our signOutauthAction,
// we have assigned that action to our props using the mapDispatch to props
/*while mapState to props allows us to use state in our redux as props in our component,
mapDispatch allows us to use actions(i.e functions) in our actioncreators as props in our component*/

const mapDispatchToProps=(dispatch)=>{
  return{
    signOut:()=>{dispatch(signOut())}
  }
}

export default connect(null,mapDispatchToProps)(SignedInLink);
