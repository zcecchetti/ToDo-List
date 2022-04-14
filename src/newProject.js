import generateTab, { deleteTab } from "./createProjectTab";

const projectList = [ ];

function newProject(projectName) {

    const taskList = [ ];
    const projectID = `project${projectList.length}`;
    // const projectName = prompt("project name? ");
    function addTask() {

        const title = prompt("what do you need to do? ");
        const dueDate = prompt("when is this due?");
        // can later put a variable here to check how many days are left
        const taskID = "task" + taskList.length;
        const summary = prompt("what are the steps to complete this? ");
        const priority = prompt("is this a high priority item? ");
        const todoItem = {title, taskID, summary, dueDate, priority}
        taskList.push(todoItem);
        console.log(taskList, "\n", todoItem);
    };
    return {projectName, projectID, taskList, addTask};
};

function addProjectToDOM(project) {

    const thisProject = project;
    const container = document.getElementById("sidebarContainer");
    const addProject = document.createElement("button");
    addProject.textContent = thisProject.projectName;
    container.appendChild(addProject);

    addProject.addEventListener("click", () => {

        deleteTab()
        generateTab(project);
    });
}

window.createProject = function() {

    const projectName = document.getElementById("projectName").value;
    const project = newProject(projectName);
    projectList.push(project);
    const index = findIndex(project)
    addProjectToDOM(projectList[index]);
    // console.log(projectList[index]);
    removeForm();
};

function findIndex(project) {

    for (let i = 0; i < projectList.length; i++) {

        if (projectList[i].projectID === project.projectID) {
            return i
        }
    };
};

function projectForm() {

    const container = document.getElementById("sidebarContainer");
    const addProjectForm = document.createElement("form");
    addProjectForm.setAttribute("id", "projectForm");
    addProjectForm.setAttribute("onsubmit", `createProject(); return false`)

    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "projectName");
    inputName.setAttribute("name", "projectName");
    inputName.setAttribute("maxlength", "30");
    inputName.setAttribute("required", "");

    addProjectForm.appendChild(inputName);
    container.appendChild(addProjectForm);
};

function removeForm() {

    const formRemove = document.getElementById("projectForm");
    const container = document.getElementById("sidebarContainer");
    container.removeChild(formRemove);
};

export {projectForm};