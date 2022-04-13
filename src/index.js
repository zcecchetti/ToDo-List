import './style.css';
import {newProject, addProjectToDOM, projectForm} from "./newProject";

const projectList = [ ];
let projectCount = 0;

const addProjectButton = document.getElementById("addProjectButton");
addProjectButton.addEventListener("click", () => {

    projectForm();
    const project = newProject(projectCount);
    projectList.push(project);
    addProjectToDOM(projectList[projectCount]);
    projectCount++;
});