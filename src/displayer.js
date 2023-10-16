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
    sectionEl.addEventListener("click", sectionHandler);
    sectionsList.appendChild(sectionEl);
}

const createSections = (sidebarEl,sections) =>{
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

    projectTitleConteiner.appendChild(addButton);

    projectEl.appendChild(projectTitleConteiner)
}

const createProjects = (projectEl, projects) => {

    const projectList = document.createElement("ul");
    projectList.classList.add("projects");

    projects.forEach(project => {
        const projectEl = document.createElement("li");
        projectEl.innerText = project.name;
        projectEl.classList.add("project");
        projectEl.dataset.id = project.id
        projectList.appendChild(projectEl);
    });

    projectEl.appendChild(projectList)
}

const createProjectSection = (sidebarEl, projects) => {
    const projectsConteiner = document.createElement("div");
    createProjectTitle(projectsConteiner);
    createProjects(projectsConteiner,projects);

    sidebarEl.appendChild(projectsConteiner);
}

const createSidebar = (sidebarEl, projects, sections) =>{
    createSections(sidebarEl,sections);
    createProjectSection(sidebarEl, projects)
}

const createTask = (taskEl, task) =>{
    const {title, description, date, priority, cheked} = task;

    const titleEl = document.createElement("h3");
    titleEl.classList.add("task-title");
    titleEl.innerText = title;

    taskEl.appendChild(titleEl);
}

const createConten = (contentEl, allTasks) =>{
    const addButton = document.createElement("button");
    addButton.innerText = "AddTask"
    addButton.classList.add("task-add");

    const buttonConteiner = document.createElement("div");
    buttonConteiner.classList.add("task");

    buttonConteiner.appendChild(addButton)

    contentEl.appendChild(buttonConteiner);

    allTasks.forEach(task =>{
        const taskel = document.createElement("div");
        taskel.classList.add("task");
        taskel.dataset.id=task.id
        createTask(taskel,task);
        contentEl.appendChild(taskel);
    })
}

export default function createDisplayer(sections, projects) {



    const renderProjects = () =>{

    }
    const renderTask = (filer) => {

    }

    const renderProject = (project) =>{

    }

    const initialize = () =>{
        const getAllProjets = () =>{
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
        createConten(content, getAllProjets());
    }

    return{
        initialize,
        renderProjects,
        renderTask,
        renderProject,
        createSection,
    }
}