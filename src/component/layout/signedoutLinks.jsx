import React from 'react'
import {NavLink} from 'react-router-dom'


const SignedOutLink=()=>{
    return(
    <div>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><NavLink to="/signIn">Login</NavLink></li>
        <li><NavLink to="/signUp">SignUp</NavLink></li>
      </ul>
    </div>
    )
}

export default SignedOutLink