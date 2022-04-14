import './style.css';
import {projectForm} from "./newProject";

const addProjectButton = document.getElementById("addProjectButton");
addProjectButton.addEventListener("click", () => {

    projectForm();
    // const projectName = getProjectFormInfo();
    // const project = newProject(projectName);
    // projectList.push(project);
    // addProjectToDOM(projectList[projectList.length - 1]);
    // projectCount++;
});
