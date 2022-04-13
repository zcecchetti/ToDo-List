import generateTab, { deleteTab } from "./createProjectTab";

function newProject(id) {

    const taskList = [ ];
    let taskCount = 0;
    const projectID = id;
    const projectName = prompt("project name? ");
    function addTask() {

        const title = prompt("what do you need to do? ");
        const dueDate = prompt("when is this due?");
        // can later put a variable here to check how many days are left
        const taskID = taskCount;
        const summary = prompt("what are the steps to complete this? ");
        const priority = prompt("is this a high priority item? ");
        const todoItem = {title, taskID, summary, dueDate, priority}
        taskList.push(todoItem);
        taskCount++
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

function projectForm() {

    const container = document.getElementById("sidebarContainer");
    const addProjectForm = document.createElement("form");
    addProjectForm.setAttribute("id", "projectForm");
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "projectName");
    inputName.setAttribute("name", "projectName");
    inputName.setAttribute("maxlength", "45");
    inputName.setAttribute("required", "");

    addProjectForm.appendChild(inputName);
    container.appendChild(addProjectForm);

};

export {newProject, addProjectToDOM, projectForm};