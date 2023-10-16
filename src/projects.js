export default function createProject(name, id){
    const tasks = []

    const addTask = (task) =>{
        tasks.push(task)
    }

    const deleteTask = (task) =>{
        const indexTask = tasks.indexOf(task);
        task.splice(indexTask,1)
    }

    const getTasks = () =>{
        return tasks
    }

    return{
        name,
        id,
        addTask,
        getTasks,
        deleteTask
    }
}