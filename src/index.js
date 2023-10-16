import createTodo from "./todo";
import createProject from "./projects";
import createDisplayer from "./displyer";
import createScreenControler from "./screenControler";
import createApp from "./app" 

const newProject = createProject("nuevo");

const newTask = createTodo("hola","si","ahora","1","no");

newProject.addTask(newTask);


createDisplayer([newProject]);

const screenControler = createScreenControler();
