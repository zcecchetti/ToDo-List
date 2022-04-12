
export default function generateTab(projectInList) {

    const container = document.getElementById("content");
    const listName = document.createElement("div");
    listName.setAttribute("id", "listName");
    listName.textContent = projectInList.projectName;
    container.appendChild(listName);

    const addTaskButton = document.createElement("button");
    addTaskButton.setAttribute("id", "addTaskButton");
    addTaskButton.textContent = "+ Add New Task";
    container.appendChild(addTaskButton);

    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("id", "taskContainer");
    container.appendChild(taskContainer);

    

    addTaskButton.addEventListener("click", () => {

        projectInList.addTask();
        let taskIndex = projectInList.taskList.length - 1;
        const taskID = projectInList.taskList[taskIndex].taskID;
        addTaskToDOM(projectInList, taskID);
    });
}

export function deleteTab() {

    const container = document.getElementById("content");
    const listName = document.getElementById("listName");
    if (listName) {
        container.removeChild(listName);
    };
};

function addTaskToDOM(projectInList, taskID) {

    const container = document.getElementById("taskContainer");
    const newTask = document.createElement("div");
    newTask.setAttribute("id", `${taskID}`);
    newTask.textContent = projectInList.taskList[taskID].title;
    container.appendChild(newTask);
};