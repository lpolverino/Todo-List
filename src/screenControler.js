import createDisplayer from "./displayer"

function createSections(){
    // los handlers estan incompletos
    return [
        {name:"All", handler: () => true},
        {name:"today", handler:(task) => task.isFromToday()},
        {name:"this Week", handler:(task) => task.isFromThisWeek()},
        {name:"Important", handler:(task) => task.isImportant()},
        {name:"Completed", handler:(task) => task.isCompleted()}]
}

export default function createScreenControler(app){

    const sections = createSections()

    const displayer = createDisplayer(sections, app.getProjects());

    let currentProject = app.firstProject();
    displayer.initialize();
    
    sections.forEach(section => {
        displayer.createSection(section.name, section.handler);
    });

    const updateScreen = () =>{
        const addTaskButton = document.getElementsByClassName("task-add")[0];
        addTaskButton.addEventListener("click", addTaskHandler)
    }

    const addTaskHandler = (event) =>{
        event.preventDefault();
        // get new task modal or form
        app.createTask("1","1","1","1","1", currentProject);
        updateScreen();
    }

    const addProjectHandler = (event) =>{
        event.preventDefault();
        // get new project modal or from
        app.createProject("1");
        updateScreen();
    }

    const addProjectButton = document.getElementsByClassName("projects-add")[0];
    addProjectButton.addEventListener("click", addProjectHandler)

    updateScreen();
}