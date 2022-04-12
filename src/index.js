import './style.css';
import {newProject, addProjectToDOM} from "./newProject";

const projectList = [ ];
let projectCount = 0;

const addProjectButton = document.getElementById("addProjectButton");
addProjectButton.addEventListener("click", () => {


    const project = newProject(projectCount);
    projectList.push(project);
    addProjectToDOM(projectList[projectCount]);
    projectCount++;
});