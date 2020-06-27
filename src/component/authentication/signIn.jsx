import React, { Component } from "react";
import { connect } from "react-redux";
import signIn from '../../store/actions/signInauthAction'
import $ from "jquery";
import M from "materialize-css";
import {Redirect} from 'react-router-dom'

class SignIn extends Component {
    state = {};
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
        //here we are supplying our state in this component i.e the email and password the user inputted, 
        //this is not the state from our redux store
    };

    componentDidMount = () => {
        $(document).ready(function () {
            M.updateTextFields();
        });
    };

    render() {
        const {authError,auth}=this.props
        if (auth.uid) {return <Redirect to='/'/>}
        /*here are doing the inverse of what we did in dashboard, we said auth.uid not !auth.uid,
        this is cos id the user is already signed in then auth.id is true thus we don't need to
        show this signIn componenet any more, so we redirect to dashboard i.e '/'*/
        return (
            <div className="container">
                <h3>SignIn</h3>
                <form onSubmit={this.handleSubmit} className="col s12 l12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="email"
                                type="email"
                                onChange={this.handleChange}
                                className="validate"
                            />
                            <label htmlFor="email" className="active">
                                Email
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="password"
                                type="password"
                                onChange={this.handleChange}
                                className="validate"
                            />
                            <label htmlFor="password" className="active">
                                Password
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <button
                                type="submit"
                                className="btn btn-large red darken-4 white-text">
                                LogIn
                            </button>
                            <div className="center red-text">
                                {authError? <p>{this.props.authError}</p>:null}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
  /*we used tenary operator to check if there is an error, if there is we output it if no error we return null*/

const mapStateToProps = (state) => {
    return {
        authError:state.auth.authError,
        auth:state.firebase.auth
    }
}
/*we said state.auth.authError, because the state is authError in our actionReducer
but in our rootReducer we assigned our authReducer to the property auth*/
/*since we now have access to the authError in our actionReducer, we can output
the error here when the use enter a wrong email or password that does not match the one they signed up
with  */

const mapDispatchToProps =(dispatch)=> {
    return{
        signIn:(credentials)=>{dispatch(signIn(credentials))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
