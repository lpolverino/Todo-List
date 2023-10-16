import createTodo from "./todo";
import createProject from "./projects";


const newProject = createProject("nuevo");

const newTask = createTodo("hola","si","ahora","1","no");

newProject.addTask(newTask);

export default {
    projects: newProject,
}
