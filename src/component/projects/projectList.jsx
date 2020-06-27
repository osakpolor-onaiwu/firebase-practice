import React from "react";
import {Link} from 'react-router-dom'
import ProjectSummary from "../projects/projectSummary";

const ProjectList = ({ projects }) => {
    // since we recieved the projects props from dashboard, we did destructuring here so we can simply say project
    return (
        <div className="projectList">
            {projects &&
                projects.map((project) => {
                    return(
                    <Link to={'/project/'+ project.id}>
                    <ProjectSummary project={project} key={project.id} />;
                    </Link>
                    )
                })}
            {/* here we did a conditional rendering, but we did not use tenary operator
        what this means is that if there is any projects, then map through
        the array of projects and return the projectsummary, but if no project don't do anything
        . we then passed each individual project in the array as props to the 
        projectSummary component
        we also added key={project.id} so each project has it id
        */}
        </div>
    );
};

export default ProjectList;
