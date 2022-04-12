
function newProject(id) {

    const taskList = [ ];
    let taskCount = 0;
    const addTask = function() {

        const title = prompt("what do you need to do? ");
        const dueDate = prompt("when is this due?");
        // can later put a variable here to check how many days are left
        const taskID = taskCount;
        const summary = prompt("what are the steps to complete this? ");
        const priority = prompt("is this a high priority item? ");
        const todoItem = {title, taskID, summary, dueDate, priority}
        taskList.push(todoItem);
        console.log(taskList, "\n", todoItem);
    };
    const projectID = id;
    const projectName = prompt("project name? ");
    return {projectName, projectID, taskList, addTask};
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