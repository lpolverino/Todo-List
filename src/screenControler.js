import createDisplayer from "./displayer"
import { format, parseISO } from "date-fns";

function createSections(){
    return [
        {name:"All", handler: (task) => true},
        {name:"today", handler:(task) => task.isFromToday()},
        {name:"this Week", handler:(task) => task.isFromThisWeek()},
        {name:"Important", handler:(task) => task.isImportant()},
        {name:"Completed", handler:(task) => task.isCompleted()}]
}

export default function createScreenControler(app){

    const formatInputDate = (inputDate) =>{
        let trim = inputDate.split("-");
        trim = trim.map((el) => Number(el))
        return new Date(trim[0], trim[1] - 1 , trim[2])
    }
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

            const formatedDate = formatInputDate(inputTaskDate);
            const inputTaskPriority = document.getElementById("task-priority").value;
            const inputTaskCheked = document.getElementById("task-check").checked;

            console.log(inputTaskCheked);


            app.createTask(
                inputTaskName,
                inputTaskDescription,
                formatedDate,
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
        //this is hard patched and shuol not be used
        event.preventDefault();
        const inputs = document.getElementsByClassName("edit-form")
        const dialog = inputs[0];
        const sumbitButton = inputs[6];
        sumbitButton.addEventListener("click", ()=>{

            const inputTaskName = inputs[1].value;
            const inputTaskDescription = inputs[2].value;
            const inputTaskDate = inputs[3].value;
            const inputTaskPriority = inputs[4].value;
            const inputTaskCheked = inputs[5].checked;
            const formatedDate = formatInputDate(inputTaskDate);

            console.log("the section to render is" + sectionToRender.id);
            console.log(inputTaskName);
            
            app.updateTask(
                pastTask.id,
                {
                    title: inputTaskName,
                    description: inputTaskDescription,
                    date: formatedDate,
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