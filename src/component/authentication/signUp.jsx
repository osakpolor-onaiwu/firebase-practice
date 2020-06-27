import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from "jquery"
import M from "materialize-css"
import {Redirect} from 'react-router-dom'
import signUpAction from '../../store/actions/signUpAction'

class SignUp extends Component {
    state={
        firstName:'',
        lastName:'',
        email:'',
        password:''
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.signUp(this.state)
    }
    
    componentDidMount=()=>{
        $(document).ready(function() {
            M.updateTextFields();
          });       
    }
    render() {
        const {auth,authError}=this.props
        if (auth.uid){return <Redirect to='/'/>}
        /*we did the same thing we did in signIn here, cos if auth.uid is true it
        means the user has signed up already so redirect to dashboard, but if auth.uid
        is false then this component will show*/
        return (
            <div className="container">
                <h3>SignUp</h3>
                <form onSubmit={this.handleSubmit} className="l12 s12 m12">
                <div className="row">
                    <div className="input-field col l6">
                    <input  id="firstName" type="text" className="validate" onChange={this.handleChange}/>
                    <label htmlFor="firstName">First Name</label>
                    </div>

                    <div className="input-field col l6">
                    <input id="lastName" type="text" className="validate" onChange={this.handleChange}/>
                    <label htmlFor="lastName">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col l12">
                    <input id="email" type="email" className="validate" onChange={this.handleChange}/>
                    <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col l12">
                    <input id="password" type="password" className="validate" onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    </div>
                </div>
               
                <div className="row">
                    <div className="input-field col l12">
                    <button type="submit" className="btn btn-large red darken-4 white-text">SignUp</button>
                    <div className="red-text center">
                    {authError? <p>{authError}</p>:null
                    }
                    </div>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}

const mapDispatchToProps=(dispatch)=> {
    return {
        signUp:(newUser)=>{dispatch(signUpAction(newUser))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
