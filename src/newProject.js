import generateTab, { deleteTab, addTaskToDOM, removeTaskForm } from "./createProjectTab";
import { format, addDays, isBefore, isEqual, isAfter } from 'date-fns'

const projectList = [ ];

function newProject(projectName) {

    const taskList = [ ];
    const projectID = `project${projectList.length}`;
    function addTask(title, summary, dueDate, priority) {

        if (!priority) {
            priority = "Low";
        }
        // if (dueDate) {
        //     dueDate = addDays(new Date(dueDate), 1);
        //     dueDate = format(new Date(dueDate), "EEE MMM d, yyyy");
        // };
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
    };
    function removeTask(taskLoc) {

        taskList.splice(taskLoc, 1);
    };

    function editTask(taskLoc, title, summary, dueDate, priority) {

        const todoItem = taskList[taskLoc];
        todoItem.title = title;
        todoItem.summary = summary;
        if (dueDate) {
            dueDate = addDays(new Date(dueDate), 1);
            dueDate = format(new Date(dueDate), "EEE MMM d, yyyy");
        };
        todoItem.dueDate = dueDate;
        todoItem.priority = priority;
    }

    // function orderTasks() {

    //     const newList = [ ];
    //     for (let i = 0; i < taskList.length; i++){

    //         const nextTodo = taskList[i];
    //         for (let j = 0; j < newList.length; j++) {

    //             if (nextTodo < newList[j]) {
    //                 newList.splice[j - 1, 0, nextTodo];
    //                 j = newList.length;
    //             };             
    //         };
    //     };
    //     taskList.splice(0, taskList.length);
    //     for (let i = 0; i < newList.length; i++) {

    //         const itemToAdd = newList[i];
    //         const title = itemToAdd.title;
    //         const summary = itemToAdd.summary;
    //         const dueDate = itemToAdd.dueDate;
    //         const priority = itemToAdd.priority;

    //         addTask(title, summary, dueDate, priority);
    //     };
    // };
    return {projectName, projectID, taskList, addTask, removeTask, editTask};
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

    projectInList.addTask(taskTitle, taskSummary, dueDate, priority);

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

    projectInList.editTask(taskLoc, taskTitle, taskSummary, dueDate, priority);

    deleteTab()
    generateTab(projectInList);
};

export {projectForm, projectList, getAndCreateTask, getAndUpdateTask};