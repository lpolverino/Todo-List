import createTodo from "./todo";
import createProject from "./projects";
import createDisplayer from "./displyer";

const newProject = createProject("nuevo");

const newTask = createTodo("hola","si","ahora","1","no");

newProject.addTask(newTask);


const screenDisplayer = createDisplayer([newProject]);


const sidebar =(function createSidebar(){
    let projects = []
})();