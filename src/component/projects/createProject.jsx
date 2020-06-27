import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import M from "materialize-css";
import { createProject } from "../../store/actions/projectActions";
import {Redirect} from 'react-router-dom'

class CreateProject extends Component {
    state = {};
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/')
        // here we called the createProject function in our mapDispatch to props and the supplied the state as an argument
        // so the state of our project is now assigned to the project parameter of the create Project function,
        //we then redirected them to the dashboard after they have created the project
    };

    componentDidMount = () => {
        $(document).ready(function () {
            M.updateTextFields();
        });
    };

    render() {
        const {auth}=this.props
        if (!auth.uid) {return <Redirect to='/signIn'/>}
        //here we did d same thing we did in dashboard
        return (
            <div className="container">
                <h3>CreateProject</h3>
                <form onSubmit={this.handleSubmit} className="col s12 l12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input
                                id="title"
                                type="text"
                                onChange={this.handleChange}
                                class="validate"
                            />
                            <label for="title" className="active">
                                Project Title
                            </label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <textarea
                                id="Content"
                                class="materialize-textarea"
                                onChange={this.handleChange}
                            />
                            <label for="Content">Content</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <button
                                type="submit"
                                className="btn btn-large red darken-4 white-text">
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapstatetoprops=(state)=>{
    return{
        auth:state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => {
            dispatch(createProject(project));
        },
    };
};

// note the action we are dispatching here is passed to the create project action creator

export default connect(mapstatetoprops, mapDispatchToProps)(CreateProject);

