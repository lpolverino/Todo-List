import newProject from "./projects"
import createTodo from "./todo"


export default function createApp(prjs){

    let projects = prjs

    const createTask = (title,description,date,priority,cheked, project) =>{
        const task = createTodo(title,description,date,priority,cheked)
        project.addTask(task)
    }
    
    const createProject = (name) =>{
        projects.push(newProject(name))
    }
    
    const updateTask = (task, newTask, project) =>{
        const indexOfTask = projects.indexOf(task);
        projects[indexOfTask] = newTask
    }

    const deleteTask = (task, project) => {
        const indexProject = projects.indexOf(project);
        projects[indexProject].deleteTask(task);
        
    }

    const deleteProject = (project) =>{
        const indexProject = projects.indexOf(project);
        projects.splice(indexProject,1)
    }

    const firstProject = () =>{
        if(!projects){
            createProject("My Project");
        }
        return projects[0];
    }

    const getProjects = () =>{
        return projects;
    }


    return{
        createTask,
        createProject,
        updateTask,
        deleteTask,
        deleteProject,
        getProjects,
        firstProject
    }
}