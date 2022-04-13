
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

        projectInList.addTask();
        let taskIndex = projectInList.taskList.length - 1;
        const taskID = projectInList.taskList[taskIndex].taskID;
        addTaskToDOM(projectInList, taskID);
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

function addTaskToDOM(projectInList, taskID) {

    const currentTask = projectInList.taskList[taskID];
    const container = document.getElementById("taskContainer");
    const newTask = document.createElement("div");
    newTask.setAttribute("id", `${taskID}`);
    newTask.classList.add("taskBox");

    const taskTitle = document.createElement("div");
    taskTitle.textContent = currentTask.title;
    taskTitle.classList.add("taskTitle")
    newTask.appendChild(taskTitle);

    const taskDue = document.createElement("div");
    taskDue.textContent = `Due: ${currentTask.dueDate}`;
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
};