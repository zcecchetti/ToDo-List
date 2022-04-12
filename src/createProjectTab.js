
export default function generateTab(projectInList) {

    const container = document.getElementById("content");
    const taskTab = document.createElement("div");
    taskTab.setAttribute("id", "taskTab");
    container.appendChild(taskTab);

    const listName = document.createElement("div");
    listName.setAttribute("id", "listName");
    listName.textContent = projectInList.projectName;
    taskTab.appendChild(listName);

    const addTaskButton = document.createElement("button");
    addTaskButton.setAttribute("id", "addTaskButton");
    addTaskButton.textContent = "+ Add New Task";
    taskTab.appendChild(addTaskButton);

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
    newTask.textContent = currentTask.title;
    newTask.classList.add("projectTask")

    const taskInfo = document.createElement("div");
    taskInfo.textContent = `${currentTask.summary} | Due: ${currentTask.dueDate}`;
    taskInfo.classList.add("taskInfo");
    newTask.appendChild(taskInfo);
    container.appendChild(newTask);
};