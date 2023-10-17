export default function createProject(name, id){
    let tasks = []

    const findTask = (taskId) =>{
        return tasks.find((task) => task.id === taskId)
    }

    const addTask = (task) =>{
        tasks.push(task)
    }

    const deleteTask = (taskId) =>{
        tasks = tasks.filter(task => task.id !== taskId)
    }

    const getTasks = () =>{
        return tasks
    }

    const hasTask = (taskId) => {
        const task = findTask(taskId);
        return task !== undefined
    }

    const updateTask = (taskId, newTask) => {
        let task = findTask(taskId)
        console.log(newTask);
        Object.assign(task, newTask);
        console.log(task);
    }

    return{
        name,
        id,
        addTask,
        getTasks,
        deleteTask,
        hasTask,
        updateTask,
    }
}