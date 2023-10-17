import createDisplayer from "./displayer"

function createSections(){
    // los handlers estan incompletos
    return [
        {name:"All", handler: (task) => true},
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
    let isRenderingSection = false;

    displayer.initialize();

    const changeDisplay = (updateTasksHandler) =>{
        // setear activo al proyecto o seccion clikeada y sacar al anterior
        tasks = updateTasksHandler();
        updateScreen()
    }
    
    sections.forEach(section => {
        displayer.createSection(section.name, () =>{
            changeDisplay(()=>{
                isRenderingSection = true
                return app.getAllTask().filter((task) =>{
                    return section.handler(task)
                })
            })
        } );
    });

    const renderProjects = () => {
        displayer.renderProjects();
        app.getProjects().forEach(project =>{
        displayer.createProject(
            project,
            (projectId) =>{
                changeDisplay(()=>{
                    isRenderingSection = false
                    return app.getProjectTask(projectId)
                })
            },
            (event, projectId) => deleteProjectHandler(event, projectId)
        );
    })}

    const renderTasks = () => {
        console.log(tasks);
        displayer.renderContent(tasks, updateTaskHandler, deleteTaskHandler)
    }

    const updateScreen = () =>{
        renderProjects();
        renderTasks();

        const addTaskButton = document.getElementsByClassName("task-add")[0];
        addTaskButton.addEventListener("click", addTaskHandler)
        // display projectId or filter
    }

    const addTaskHandler = (event) =>{
        event.preventDefault();
        if(isRenderingSection){
            //can be change a little bit nicer
            alert("You Have to be in an Project to add a Task")
            return;
        }
        const dialog = document.getElementsByClassName("task-dialog")[0];
        dialog.showModal();
        const sumbitButton = document.getElementsByClassName("sumbit-task")[0];
        sumbitButton.addEventListener("click", ()=>{

            const inputTaskName = document.getElementById("task-name").value;
            const inputTaskDescription = document.getElementById("task-description").value;
            const inputTaskDate = document.getElementById("task-date").value;
            const inputTaskPriority = document.getElementById("task-priority").value;
            const inputTaskCheked = document.getElementById("task-check").value;
            
            app.createTask(
                inputTaskName,
                inputTaskDescription,
                inputTaskDate,
                inputTaskPriority,
                inputTaskCheked,
                sectionToRender.id
            )

            dialog.close();
            updateScreen();
        });
    }
    const addProjectHandler = (event) =>{
        event.preventDefault();
        const dialog = document.getElementsByClassName("project-dialog")[0];
        dialog.showModal();
        const sumbitButton = document.getElementsByClassName("sumbit-project")[0];
        sumbitButton.addEventListener("click", ()=>{
            const projectName = document.getElementById("project").value
            app.createProject(projectName);
            dialog.close();
            updateScreen();
        });
    }
    
    const deleteProjectHandler = (event,projectId) =>{
        event.preventDefault();
        app.deleteProject(projectId);
        if(sectionToRender.id === projectId){
            tasks = []
        }
        updateScreen();
    }
    const deleteTaskHandler = (event, taskId) =>{
        event.preventDefault();
        app.deleteTask(taskId)
        tasks = sectionToRender.getTasks();
        updateScreen()
    }
    const updateTaskHandler = (event, pastTask) =>{
        event.preventDefault();
        const dialog = document.getElementsByClassName("edit")[0];
        const sumbitButton = document.getElementsByClassName("edit")[1];
        sumbitButton.addEventListener("click", ()=>{

            const inputTaskName = document.getElementById("task-name").value;
            const inputTaskDescription = document.getElementById("task-description").value;
            const inputTaskDate = document.getElementById("task-date").value;
            const inputTaskPriority = document.getElementById("task-priority").value;
            const inputTaskCheked = document.getElementById("task-check").value;

            console.log("the section to render is" + sectionToRender.id);
            
            app.updateTask(
                pastTask.id,
                {
                    title: inputTaskName,
                    description: inputTaskDescription,
                    date: inputTaskDate,
                    priority: inputTaskPriority,
                    cheked: inputTaskCheked,
                }
            )

            dialog.close();
            updateScreen();
        });
        
        dialog.showModal();
        tasks = sectionToRender.getTasks();
    }

    const addProjectButton = document.getElementsByClassName("projects-add")[0];
    addProjectButton.addEventListener("click", addProjectHandler);

    updateScreen();

}