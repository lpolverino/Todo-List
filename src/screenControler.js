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

    let sectionToRender = app.firstProject();
    let tasks = sectionToRender.getTasks();

    displayer.initialize();

    const changeDisplay = (updateTaskHandler) =>{
        // setear activo al proyecto o seccion clikeada y sacar al anterior
        tasks = updateTaskHandler();
        updateScreen()
    }
    
    sections.forEach(section => {
        displayer.createSection(section.name, () =>{
            changeDisplay(()=>{
                section.handler()
            })
        } );
    });


    const renderProjects = () => {
        app.getProjects().forEach(project =>{
        displayer.createProject(project, (projectId) =>{
            changeDisplay(()=>{
                app.getProjectTask(projectId)
            })
        });
    })}

    const renderTasks = () => {
        displayer.renderContent(tasks)
    }

    const updateScreen = () =>{
        const addTaskButton = document.getElementsByClassName("task-add")[0];
        addTaskButton.addEventListener("click", addTaskHandler)

        renderProjects();
        renderTasks();
        // display projectId or filter
    }

    const addTaskHandler = (event) =>{
        event.preventDefault();
        // get new task modal or form
        app.createTask("1","1","1","1","1", sectionToRender);
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