import generateTab, { deleteTab } from "./createProjectTab";
import { isBefore, isEqual} from 'date-fns'

// check storage
if (localStorage.getItem("test2")) {

    var projectList = JSON.parse(localStorage.getItem("test2"));
    console.log(projectList);
    projectListLoad();
} else {

    var projectList = [ ];
};

function updateProjectList() {

    localStorage.setItem("test2", JSON.stringify(projectList));
    console.log(projectList)
}

function newProject(projectName) {

    const taskList = [ ];
    const projectID = `project${projectList.length}`;

    return {projectName, projectID, taskList};
};

function addTask(projectInList, title, summary, dueDate, priority) {

        const taskList = projectInList.taskList;
        if (!priority) {
            priority = "Low";
        }
        const todoItem = {title, summary, dueDate, priority};

        for (let i = 0; i < taskList.length; i++) {
            let priorDate = isBefore(new Date(todoItem.dueDate), new Date(taskList[i].dueDate));
            let equalDate = isEqual(new Date(todoItem.dueDate), new Date(taskList[i].dueDate));
            if (priorDate) {
                taskList.splice(i, 0, todoItem);
                i = taskList.length;
            } else if (equalDate) {
                taskList.splice(i + 1, 0, todoItem);
                i = taskList.length;
            } else if (i === taskList.length - 1) {
                taskList.push(todoItem);
                i = taskList.length
            };
        };

        if (taskList.length === 0) {
            taskList.push(todoItem);
        };
        updateProjectList();
};

function editTask(projectInList, taskLoc, title, summary, dueDate, priority) {

    removeTask(projectInList, taskLoc);
    addTask(projectInList, title, summary, dueDate, priority);
    updateProjectList();
};

function removeTask(projectInList, taskLoc) {

    const taskList = projectInList.taskList;
    taskList.splice(taskLoc, 1);
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

function projectListLoad() {

    for (let i = 0; i < projectList.length; i++) {
        const project = projectList[i];
        addProjectToDOM(project);
        console.log(project);
    };
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

    const listName = document.getElementById("listName");
    const projectIdentification = listName.className;
    for (let i = 0; i < projectList.length; i++) {

        if (projectList[i].projectID === projectIdentification) {
            const project = projectList[i];
            return project
        }
    }

};

function getCurrentTask() {

    const taskName = document.getElementById("inputName");
    const taskLoc = taskName.className;
    return taskLoc
};

function getAndCreateTask() {

    const taskTitle = getTaskTitle();
    const taskSummary = getTaskSummary();
    const dueDate = getDueDate();
    const priority = getPriority();
    const projectInList = getCurrentProject();

    addTask(projectInList, taskTitle, taskSummary, dueDate, priority);

    deleteTab();
    generateTab(projectInList);
};

function getAndUpdateTask() {

    const taskTitle = getTaskTitle();
    const taskSummary = getTaskSummary();
    const dueDate = getDueDate();
    const priority = getPriority();
    const projectInList = getCurrentProject();
    const taskLoc = getCurrentTask();

    editTask(projectInList, taskLoc, taskTitle, taskSummary, dueDate, priority);

    deleteTab()
    generateTab(projectInList);
};

export {projectForm, projectList, getAndCreateTask, getAndUpdateTask};