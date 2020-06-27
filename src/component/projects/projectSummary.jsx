import React, { Component } from "react";
import moment from 'moment'

const ProjectSummary = ({ project }) => {
    //  we recieved each individual project as from the projectList Component
    //   we then output this jsx for each project in the array
    // we could have just written this code inside project list, to be cleaner we wrote it here and rendered it there

    return (
        <div className="card blue-grey darken-1" >
            <div className="card-content white-text">
                <span className="card-title">{project.title}</span>
                <div className="divider"></div>
                <p className="section">
                <strong>Posted by {project.authorFirstName} {project.authorLastName}</strong>
                </p>
                <p>{moment(project.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
};

export default ProjectSummary;

// we got the authorFirstName and LastName cos we set them in our project action
// note we used moment to output the date properly and easily. we accesed the createdAt property we created in our projectActions
//the .calender is a moment method that allows use output in a certain format