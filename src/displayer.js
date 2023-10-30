
const createHeader = (headerEl) =>{
    const title = document.createElement("h1");
    title.innerText = "TODO LIST"
    headerEl.appendChild(title);
}

const createSection = (sectionName, sectionHandler) =>{
    const sectionsList = document.getElementsByClassName("sections")[0];
    const sectionEl = document.createElement("li")
    const sectionLink = document.createElement("a")
    sectionLink.innerText = sectionName;
    sectionLink.setAttribute("href", "#")
    sectionLink.dataset.section = sectionName
    sectionLink.classList.add("section-link");
    sectionEl.appendChild(sectionLink)
    sectionEl.classList.add("section")
    sectionEl.addEventListener("click", (e) =>{
        e.preventDefault();
        sectionHandler();
    });
    sectionsList.appendChild(sectionEl);
}

const createSections = (sidebarEl) =>{
    const sectionConteiner = document.createElement("div");
    sectionConteiner.classList.add("section-conteiner");

    const sectionsList = document.createElement("ul");
    sectionsList.classList.add("sections")
    sectionConteiner.appendChild(sectionsList);
    sidebarEl.appendChild(sectionConteiner);
}

const createProjectTitle = (projectEl) => {
    const projectTitleConteiner = document.createElement("div");
    projectTitleConteiner.classList.add("projects-conteiner")

    const projectTitle = document.createElement("h2");
    projectTitle.innerText = "Projects"
    projectTitle.classList.add("project-title")
    projectTitleConteiner.appendChild(projectTitle)

    const addButton = document.createElement("button");
    addButton.classList.add("projects-add");
    addButton.innerText ="Add Project"

    const dialog = document.createElement("dialog");
    dialog.classList.add("project-dialog");
    projectTitleConteiner.appendChild(dialog);

    const form = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id","project");
    input.setAttribute("name","Project");

    const sumbitButton = document.createElement("button");
    sumbitButton.classList.add("sumbit-project");

    form.appendChild(input);
    dialog.appendChild(form);
    form.appendChild(sumbitButton);

    projectTitleConteiner.appendChild(addButton);

    projectEl.appendChild(projectTitleConteiner);
}

const createFormDialog = (fatherConteiner, clas) =>{
    const dialog = document.createElement("dialog");
    dialog.classList.add("task-dialog");
    dialog.classList.add(clas)

    const form = document.createElement("form");
    
    const inputTaskName = document.createElement("input");
    inputTaskName.setAttribute("type","text");
    inputTaskName.setAttribute("id","task-name");
    inputTaskName.setAttribute("name","task-name");
    inputTaskName.classList.add(clas)

    const inputTaskDescription = document.createElement("input");
    inputTaskDescription.setAttribute("type","text");
    inputTaskDescription.setAttribute("id","task-description");
    inputTaskDescription.setAttribute("name","task-description");
    inputTaskDescription.classList.add(clas)

    const inputTaskDate = document.createElement("input");
    inputTaskDate.setAttribute("type","date");
    inputTaskDate.setAttribute("id","task-date");
    inputTaskDate.setAttribute("name","task-date");
    inputTaskDate.classList.add(clas)

    const inputTaskPriority = document.createElement("input");
    inputTaskPriority.setAttribute("type","number");
    inputTaskPriority.setAttribute("id","task-priority");
    inputTaskPriority.setAttribute("name","task-priority");
    inputTaskPriority.classList.add(clas)

    const inputTaskCheked = document.createElement("input");
    inputTaskCheked.setAttribute("type","checkbox");
    inputTaskCheked.setAttribute("id","task-check");
    inputTaskCheked.setAttribute("name","task-check");
    inputTaskCheked.classList.add(clas)

    const sumbitButton = document.createElement("button");
    sumbitButton.classList.add("sumbit-task");
    sumbitButton.classList.add(clas);

    form.appendChild(inputTaskName);
    form.appendChild(inputTaskDescription);
    form.appendChild(inputTaskDate);
    form.appendChild(inputTaskPriority);
    form.appendChild(inputTaskCheked);
    dialog.appendChild(form);
    form.appendChild(sumbitButton);
    fatherConteiner.appendChild(dialog);
}

const createProject = (project, clickHandler, deleteHandler) =>{
    const projectList = document.getElementsByClassName("projects")[0];
    const projectEl = document.createElement("li");
    const projectName = document.createElement("a");
    projectName.innerText = project.name;
    projectName.setAttribute("href", "#");
    projectEl.appendChild(projectName);
    projectEl.classList.add("project");
    projectEl.dataset.id = project.id
    projectEl.addEventListener("click", (e) =>{
        e.preventDefault();
        clickHandler(project.id);
    })
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (e) =>{
        e.preventDefault();
        deleteHandler(e, project.id);
    })

    projectEl.appendChild(deleteButton)
    projectList.appendChild(projectEl);
}

const createProjects = (projectEl) => {

    const projectList = document.createElement("ul");
    projectList.classList.add("projects");

    projectEl.appendChild(projectList)
}

const createProjectSection = (sidebarEl, projects) => {
    const projectsConteiner = document.createElement("div");
    projectsConteiner.classList.add("projects-conteiner")
    createProjectTitle(projectsConteiner);
    createProjects(projectsConteiner,projects);

    sidebarEl.appendChild(projectsConteiner);
}

const createSidebar = (sidebarEl, projects, sections) =>{
    createSections(sidebarEl,sections);
    createProjectSection(sidebarEl, projects)
}

const createTask = (taskEl, task, editHandler, deleteHandler) =>{
    const {title, description, date, priority, cheked, id} = task;


    const titleEl = document.createElement("h3");
    titleEl.classList.add("task-title");
    titleEl.innerText = title;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", (event) => {
        createFormDialog(taskEl,"edit-form")
        editHandler(event, task)
    })

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => deleteHandler(event,id))

    taskEl.appendChild(titleEl);
    taskEl.appendChild(editButton);
    taskEl.appendChild(deleteButton);
}

const emptyContent = (contentEl) => {
    while (contentEl.firstChild) {
        contentEl.removeChild(contentEl.lastChild);
    }
}

const renderContent = (tasks, editHandler, deleteHandler) =>{
    const contentEl = document.getElementById("content");
    emptyContent(contentEl)
    createConten(tasks, contentEl, editHandler, deleteHandler)
} 

const createConten = (allTasks, contentEl, editHandler, deleteHandler) =>{
    const addButton = document.createElement("button");
    addButton.innerText = "AddTask"
    addButton.classList.add("task-add");

    const buttonConteiner = document.createElement("div");
    buttonConteiner.classList.add("task");

    buttonConteiner.appendChild(addButton)

    createFormDialog(buttonConteiner);

    contentEl.appendChild(buttonConteiner);
    console.log(allTasks);

    allTasks.forEach(task =>{
        const taskel = document.createElement("div");
        taskel.classList.add("task");
        taskel.dataset.id=task.id
        createTask(taskel,task, editHandler, deleteHandler);
        contentEl.appendChild(taskel);
    })
}

export default function createDisplayer(sections, projects) {

    const initialize = () =>{
        const getAllTasks = () =>{
            let tasks = []
            projects.forEach(project => {
                tasks = tasks.concat(project.getTasks())
            })
            return tasks;
        }
        const header = document.getElementById("header");
        createHeader(header)

        const sidebar = document.getElementById("sidebar");
        createSidebar(sidebar,projects, sections);


        const content = document.getElementById("content");
        createConten(getAllTasks(), content);
    }


    const renderProjects = () =>{
        const projects = document.getElementsByClassName("projects")[0];
        emptyContent(projects)
    }

    return{
        initialize,
        createSection,
        createProject,
        renderContent,
        renderProjects
    }
}