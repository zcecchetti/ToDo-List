import generateTab, { deleteTab, addTaskToDOM, removeTaskForm } from "./createProjectTab";
import { format, addDays } from 'date-fns'

const projectList = [ ];

function newProject(projectName) {

    const taskList = [ ];
    const projectID = `project${projectList.length}`;
    function addTask(title, summary, dueDate, priority) {

        if (!priority) {
            priority = "Low";
        }
        if (dueDate) {
            dueDate = addDays(new Date(dueDate), 1);
            dueDate = format(new Date(dueDate), "EEE MMM d, yyyy");
        };
        const taskLoc = taskList.length;
        const todoItem = {title, taskLoc, summary, dueDate, priority}
        taskList.push(todoItem);
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

function getTaskTitle() {

    const taskTitle = document.getElementById("inputName").value;
    return taskTitle;
};

function getTaskSummary() {

    const taskSummary = document.getElementById("inputSummary").value;
    return taskSummary;
};

function getDueDate() {

    const dueDate = document.getElementById("inputDue").value;
    return dueDate;
};

function getPriority() {

    const priority = document.getElementById("inputPriority").value;
    return priority;
};

function getCurrentProject() {

    const listName = document.getElementById("listName").textContent;
    for (let i = 0; i < projectList.length; i++) {

        if (projectList[i].projectName === listName) {
            const project = projectList[i];
            return project
        }
    }

};

function getAndCreateTask() {

    const taskTitle = getTaskTitle();
    const taskSummary = getTaskSummary();
    const dueDate = getDueDate();
    const priority = getPriority();
    const projectInList = getCurrentProject();

    projectInList.addTask(taskTitle, taskSummary, dueDate, priority);
    let taskIndex = projectInList.taskList.length - 1;
    // const taskLoc = projectInList.taskList[taskIndex].taskLoc;

    deleteTab();
    generateTab(projectInList);
};

export {projectForm, projectList, getAndCreateTask};