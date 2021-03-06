import { getAndCreateTask, getAndUpdateTask } from "./newProject";
import { format, addDays } from 'date-fns'

export default function generateTab(projectInList) {

    const container = document.getElementById("content");
    const taskTab = document.createElement("div");
    taskTab.setAttribute("id", "taskTab");
    container.appendChild(taskTab);

    const taskTabHeader = document.createElement("div");
    taskTabHeader.setAttribute("id", "tabHeader");
    taskTab.appendChild(taskTabHeader);

    const listName = document.createElement("div");
    listName.setAttribute("id", "listName");
    listName.textContent = projectInList.projectName;
    listName.classList.add(projectInList.projectID);
    taskTabHeader.appendChild(listName);

    const addTaskButton = document.createElement("button");
    addTaskButton.setAttribute("id", "addTaskButton");
    addTaskButton.textContent = "+ Add New Task";
    taskTabHeader.appendChild(addTaskButton);

    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("id", "taskContainer");
    taskTab.appendChild(taskContainer);

    if (projectInList.taskList.length > 0) {

        for (let i = 0; i < projectInList.taskList.length; i++) {

            addTaskToDOM(projectInList, i);
        };
    };

    addTaskButton.addEventListener("click", () => {

        deleteTab();
        createTaskFormTab(projectInList);
    });
}

export function deleteTab() {

    const container = document.getElementById("content");
    const taskTab = document.getElementById("taskTab");
    const userGreeting = document.getElementById("userGreeting");
    if (taskTab) {
        container.removeChild(taskTab);
    } else {
        container.removeChild(userGreeting);
    }
};

export function addTaskToDOM(projectInList, taskLoc) {

    const currentTask = projectInList.taskList[taskLoc];
    const container = document.getElementById("taskContainer");
    const newTask = document.createElement("div");
    newTask.setAttribute("id", `${taskLoc}`);
    newTask.classList.add("taskBox");
    newTask.classList.add(`${currentTask.priority}`);

    const taskTitle = document.createElement("div");
    taskTitle.textContent = currentTask.title;
    taskTitle.classList.add("taskTitle")
    newTask.appendChild(taskTitle);

    let dueDate = currentTask.dueDate;
    if (dueDate) {
        dueDate = addDays(new Date(dueDate), 1);
        dueDate = format(new Date(dueDate), "EEE MMM d, yyyy");
    };
    const taskDue = document.createElement("div");
    taskDue.textContent = "Due: " + ` ${dueDate}`;
    taskDue.classList.add("dueDate")
    newTask.appendChild(taskDue);

    const taskPriority = document.createElement("div");
    taskPriority.textContent = `${currentTask.priority} Priority`;
    taskPriority.classList.add("taskPriority");
    newTask.appendChild(taskPriority);

    const taskDescription = document.createElement("div");
    taskDescription.textContent = currentTask.summary;
    taskDescription.classList.add("taskSummary");
    newTask.appendChild(taskDescription);

    container.appendChild(newTask);

    newTask.addEventListener("click", () => {

        deleteTab();
        viewFullTask(projectInList, taskLoc);
    });
};

window.createTask = function() {

    getAndCreateTask();
};

function createTaskForm() {

    const taskContainer = document.getElementById("taskTab");
    const taskForm = document.createElement("form");
    taskForm.setAttribute("id", "taskForm");
    taskForm.setAttribute("onsubmit", "createTask(); return false");
    taskContainer.appendChild(taskForm);

    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "inputName");
    inputName.setAttribute("name", "taskName");
    inputName.setAttribute("maxlength", "50");
    inputName.setAttribute("placeholder", "Task Title");
    inputName.setAttribute("required", "");

    taskForm.appendChild(inputName);

    const inputSummary = document.createElement("textarea");
    inputSummary.setAttribute("id", "inputSummary");
    inputSummary.setAttribute("name", "taskSummary");
    inputSummary.setAttribute("placeholder", "Specifics for this task");
    inputSummary.setAttribute("maxlength", "2000");

    taskForm.appendChild(inputSummary);

    const labelDue = document.createElement("label");
    labelDue.setAttribute("for", "inputDue");
    labelDue.setAttribute("id", "labelDue");
    labelDue.textContent = "Due Date: "
    const inputDue = document.createElement("input");
    inputDue.setAttribute("type", "date");
    inputDue.setAttribute("id", "inputDue");
    inputDue.setAttribute("name", "dueDate");
    inputDue.setAttribute("required", "");

    taskForm.appendChild(labelDue);
    taskForm.appendChild(inputDue);

    const labelPriority = document.createElement("label");
    labelPriority.setAttribute("for", "inputPriority");
    labelPriority.setAttribute("id", "labelPriority");
    labelPriority.textContent = "Priority: "
    const inputPriority = document.createElement("input");
    inputPriority.setAttribute("list", "priorityLevels");
    inputPriority.setAttribute("id", "inputPriority");
    // inputPriority.setAttribute("required", "");
    inputPriority.setAttribute("name", "priority");
    const dropDown = document.createElement("datalist");
    dropDown.setAttribute("id", "priorityLevels");

    const optionLow = document.createElement("option");
    optionLow.setAttribute("value", "Low");
    const optionMed = document.createElement("option");
    optionMed.setAttribute("value", "Medium");
    const optionHigh = document.createElement("option");
    optionHigh.setAttribute("value", "High");
    const optionUrg = document.createElement("option");
    optionUrg.setAttribute("value", "Urgent");

    taskForm.appendChild(labelPriority);
    taskForm.appendChild(inputPriority);
    taskForm.appendChild(dropDown);
    dropDown.appendChild(optionLow);
    dropDown.appendChild(optionMed);
    dropDown.appendChild(optionHigh);
    dropDown.appendChild(optionUrg);
};

export function removeTaskForm() {

    const taskContainer = document.getElementById("taskContainer");
    const taskForm = document.getElementById("taskForm");
    taskContainer.removeChild(taskForm);
};

export function createTaskFormTab(projectInList) {

    const container = document.getElementById("content");
    const taskTab = document.createElement("div");
    taskTab.setAttribute("id", "taskTab");
    container.appendChild(taskTab);

    const taskTabHeader = document.createElement("div");
    taskTabHeader.setAttribute("id", "tabHeader");
    taskTab.appendChild(taskTabHeader);

    const listName = document.createElement("div");
    listName.setAttribute("id", "listName");
    listName.textContent = projectInList.projectName;
    listName.classList.add(projectInList.projectID);
    taskTabHeader.appendChild(listName);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submitTaskButton")
    submitButton.textContent = "Save Task";
    submitButton.setAttribute("form", "taskForm")
    taskTabHeader.appendChild(submitButton);

    createTaskForm();

};

function viewFullTask(projectInList, taskLoc) {

    const container = document.getElementById("content");
    const taskTab = document.createElement("div");
    taskTab.setAttribute("id", "taskTab");
    container.appendChild(taskTab);

    const taskTabHeader = document.createElement("div");
    taskTabHeader.setAttribute("id", "tabHeader");
    taskTab.appendChild(taskTabHeader);

    const listName = document.createElement("div");
    listName.setAttribute("id", "listName");
    listName.textContent = projectInList.projectName;
    listName.classList.add(projectInList.projectID);
    taskTabHeader.appendChild(listName);

    const editTaskButton = document.createElement("button");
    editTaskButton.setAttribute("id", "addTaskButton");
    editTaskButton.textContent = "Edit Task";
    taskTabHeader.appendChild(editTaskButton);

    const removeTaskButton = document.createElement("button");
    removeTaskButton.setAttribute("id", "removeTaskButton");
    removeTaskButton.textContent = "Delete Task";
    taskTabHeader.appendChild(removeTaskButton);

    editTaskButton.addEventListener("click", () => {

        deleteTab();
        const title = projectInList.taskList[taskLoc].title;
        const summary = projectInList.taskList[taskLoc].summary;
        let dueDate = projectInList.taskList[taskLoc].dueDate;
        if (dueDate) {
            dueDate = format(new Date(dueDate), "yyyy-MM-dd");
        }
        const priority = projectInList.taskList[taskLoc].priority;
        editTaskForm(projectInList, taskLoc, title, summary, dueDate, priority);
    });

    removeTaskButton.addEventListener("click", () => {

        projectInList.removeTask(taskLoc);
        deleteTab()
        generateTab(projectInList);
    });

    addTasktoFullView(projectInList, taskLoc)
};

window.updateTask = function() {

    getAndUpdateTask();
};

function addTasktoFullView(projectInList, taskLoc) {

    const currentTask = projectInList.taskList[taskLoc];
    const container = document.getElementById("taskTab");
    const newTask = document.createElement("div");
    newTask.setAttribute("id", `${taskLoc}`);
    newTask.classList.add("taskBox");

    const taskTitle = document.createElement("div");
    taskTitle.textContent = currentTask.title;
    taskTitle.classList.add("taskTitle")
    newTask.appendChild(taskTitle);

    const taskDue = document.createElement("div");
    taskDue.textContent = "Due: " + ` ${currentTask.dueDate}`;
    taskDue.classList.add("dueDate")
    newTask.appendChild(taskDue);

    const taskPriority = document.createElement("div");
    taskPriority.textContent = `${currentTask.priority} Priority`;
    taskPriority.classList.add("taskPriority");
    newTask.appendChild(taskPriority);

    const taskDescription = document.createElement("div");
    taskDescription.textContent = currentTask.summary;
    taskDescription.classList.add("fullSummary");
    newTask.appendChild(taskDescription);

    container.appendChild(newTask);
};

function editTaskForm(projectInList, taskLoc, title, summary, dueDate, priority) {

    const container = document.getElementById("content");
    const taskTab = document.createElement("div");
    taskTab.setAttribute("id", "taskTab");
    container.appendChild(taskTab);

    const taskTabHeader = document.createElement("div");
    taskTabHeader.setAttribute("id", "tabHeader");
    taskTab.appendChild(taskTabHeader);

    const listName = document.createElement("div");
    listName.setAttribute("id", "listName");
    listName.textContent = projectInList.projectName;
    listName.classList.add(projectInList.projectID);
    taskTabHeader.appendChild(listName);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submitTaskButton")
    submitButton.textContent = "Save Task";
    submitButton.setAttribute("form", "taskForm")
    taskTabHeader.appendChild(submitButton);
    
    const taskContainer = document.getElementById("taskTab");
    const taskForm = document.createElement("form");
    taskForm.setAttribute("id", "taskForm");
    taskForm.setAttribute("onsubmit", "updateTask(); return false");
    taskContainer.appendChild(taskForm);

    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "inputName");
    inputName.setAttribute("name", "taskName");
    inputName.setAttribute("maxlength", "50");
    inputName.setAttribute("value", title);
    inputName.setAttribute("required", "");
    inputName.classList.add(taskLoc);

    taskForm.appendChild(inputName);

    const inputSummary = document.createElement("textarea");
    inputSummary.setAttribute("id", "inputSummary");
    inputSummary.setAttribute("name", "taskSummary");
    inputSummary.textContent = summary;
    inputSummary.setAttribute("maxlength", "2000");

    taskForm.appendChild(inputSummary);

    const labelDue = document.createElement("label");
    labelDue.setAttribute("for", "inputDue");
    labelDue.setAttribute("id", "labelDue");
    labelDue.textContent = "Due Date: "
    const inputDue = document.createElement("input");
    inputDue.setAttribute("type", "date");
    inputDue.setAttribute("id", "inputDue");
    inputDue.setAttribute("name", "dueDate");
    inputDue.setAttribute("value", dueDate);

    taskForm.appendChild(labelDue);
    taskForm.appendChild(inputDue);

    const labelPriority = document.createElement("label");
    labelPriority.setAttribute("for", "inputPriority");
    labelPriority.setAttribute("id", "labelPriority");
    labelPriority.textContent = "Priority: "
    const inputPriority = document.createElement("input");
    inputPriority.setAttribute("list", "priorityLevels");
    inputPriority.setAttribute("id", "inputPriority");
    inputPriority.setAttribute("value", priority);
    inputPriority.setAttribute("name", "priority");
    const dropDown = document.createElement("datalist");
    dropDown.setAttribute("id", "priorityLevels");

    const optionLow = document.createElement("option");
    optionLow.setAttribute("value", "Low");
    const optionMed = document.createElement("option");
    optionMed.setAttribute("value", "Medium");
    const optionHigh = document.createElement("option");
    optionHigh.setAttribute("value", "High");
    const optionUrg = document.createElement("option");
    optionUrg.setAttribute("value", "Urgent");

    taskForm.appendChild(labelPriority);
    taskForm.appendChild(inputPriority);
    taskForm.appendChild(dropDown);
    dropDown.appendChild(optionLow);
    dropDown.appendChild(optionMed);
    dropDown.appendChild(optionHigh);
    dropDown.appendChild(optionUrg);
};

function storageAvailable(type) {
    var storage;
    type = "localStorage"
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    };
};

