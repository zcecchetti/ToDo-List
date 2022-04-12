
function newProject(id) {

    const taskList = [ ];
    const projectID = id;
    const projectName = prompt("project name? ");
    return {projectName, projectID, taskList};
};

function addProjectToDOM(project) {

    const thisProject = project;
    const container = document.getElementById("sidebarContainer");
    const addProject = document.createElement("button")
    addProject.textContent = thisProject.projectName;
    container.appendChild(addProject);

    addProject.addEventListener("click", () => {

        alert(project.projectName);
    });
}

export {newProject, addProjectToDOM};