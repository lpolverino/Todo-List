import newProject from "./projects"
import createTodo from "./todo"


export default function createApp(prjs){
    let projects = []

    let max =  1000000

    const findProjectTask = (taskId) =>{
        return  projects.find((prj) =>{
            return prj.hasTask(taskId)
        })
    }

    const getUniqueId = () =>{
        return  Math.floor(Math.random() * max)
    }

    const createTask = (title,description,date,priority,cheked, projectId) =>{
        const task = createTodo(title,description,date,priority,cheked, getUniqueId())
        const projectToAddTask = projects.find(project => project.id === projectId)
        projectToAddTask.addTask(task)
    }
    
    const createProject = (name) =>{
        const project = newProject(name,  getUniqueId())
        projects.push(project)
        return project.id
    }
    
    const updateTask = (taskId, newTask) =>{
        const project = findProjectTask(taskId);
        project.updateTask(taskId,newTask)
    }

    const deleteTask = (taskId) => {
        const project = findProjectTask(taskId);
        const indexProject = projects.indexOf(project);
        projects[indexProject].deleteTask(taskId);
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

    const getProjectTask = (projectId) => {
        return projects.find(project => project.id === projectId).getTasks()
    }

    const getAllTask = () =>{
        let placeholder= projects.map((project) =>{
            return project.getTasks();
        })
        return placeholder.reduce((prev,next) =>{
            return prev.concat(next)
        })
    }


    return{
        createTask,
        createProject,
        updateTask,
        deleteTask,
        deleteProject,
        getProjects,
        firstProject,
        getProjectTask,
        getAllTask
    }
}