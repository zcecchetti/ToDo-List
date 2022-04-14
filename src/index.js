import './style.css';
import {projectForm} from "./newProject";

const addProjectButton = document.getElementById("addProjectButton");
addProjectButton.addEventListener("click", () => {

    projectForm();
});
