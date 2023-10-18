import newProject from "./projects"
import createTodo from "./todo"
import {storageAvailable} from "./storage"

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

    const saveStorage = (element,type) =>{
        if(!storageAvailable("localStorage")) return
        const storage = JSON.parse(localStorage.getItem(type));
        storage.list.push(element)
        localStorage.setItem(type, JSON.stringify(storage))
    }

    const destroyStorage = (id, type) =>{
        if(!storageAvailable("localStorage")) return
        const storage = JSON.parse(localStorage.getItem(type));
        const element = storage.list.find(el => el.id === id);
        const index = storage.list.indexOf(element);
        storage.list.splice(index, 1);
        localStorage.setItem(type, JSON.stringify(storage))
    }

    const updateStorage = (taskId, projectId, newTask) =>{
        console.log("updating storage");
        if(!storageAvailable("localStorage")) return
        const storage = JSON.parse(localStorage.getItem("tasks"));
        let task = storage.list.find(tsk =>tsk.id === taskId);
        Object.assign(task, newTask);
        console.log(newTask);
        console.log(task);
        localStorage.setItem("tasks", JSON.stringify(storage))
        console.log("updating storage");
        } 

    const populateProjects = (app) =>{
        const projectsList = JSON.parse(localStorage.getItem("projects"))
        projectsList.list.forEach(savedProject =>{
            const project = newProject(savedProject.name, savedProject.id)
            projects.push(project)
        })
    }
    
      const populateTasks = () =>{
        const taskList = JSON.parse(localStorage.getItem("tasks"))
        taskList.list.forEach(savedTask =>{
            const {title, description, date,priority,cheked,id, projectId} = savedTask
            const task = createTodo(title,description,date,priority,cheked, id)
            const projectToAddTask = projects.find(project => project.id === projectId)
            projectToAddTask.addTask(task)
        })
    }

    function populate(){
        if(!storageAvailable("localStorage")) return
        populateProjects();
        populateTasks();
      }

    const createTask = (title,description,date,priority,cheked, projectId) =>{
        const id = getUniqueId()
        const task = createTodo(title,description,date,priority,cheked, id)
        const projectToAddTask = projects.find(project => project.id === projectId)
        projectToAddTask.addTask(task)
        saveStorage({
            title,
            description,
            date,
            priority,
            cheked,
            id,
            projectId
        },"tasks")
    }
    
    const createProject = (name) =>{
        const id = getUniqueId()
        const project = newProject(name,  id)
        projects.push(project)
        saveStorage({
            name,
            id
        }, "projects")
        return project.id
    }
    
    const updateTask = (taskId, newTask) =>{
        console.log(newTask);
        const project = findProjectTask(taskId);
        project.updateTask(taskId,newTask)
        updateStorage(taskId, project.id, newTask)

    }

    const deleteTask = (taskId) => {
        const project = findProjectTask(taskId);
        const indexProject = projects.indexOf(project);
        projects[indexProject].deleteTask(taskId);
        destroyStorage(taskId, "tasks");
    }

    const deleteProject = (projectId) =>{
        const project = projects.find((project)=>project.id === projectId)
        const indexProject = projects.indexOf(project);
        projects.splice(indexProject,1)
        project.getTasks().forEach(task => {
            project.deleteTask(task.id)
        });
        destroyStorage(projectId, "projects")
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
        const project = projects.find(project => project.id === projectId)
        return project ? project.getTasks() : []
    }

    const getAllTask = () =>{
        let placeholder= projects.map((project) =>{
            return project.getTasks();
        })
        if(placeholder){
            return placeholder.reduce((prev,next) =>{
                return prev.concat(next)
            }) 
        } 
        return []
    }

    const getProjectId = (projectName) =>{
        return projects.find(project => project.name === projectName)
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
        getAllTask,
        getProjectId,
        populate
    }
}