import projects from "./mockUp";
import createDisplayer from "./displayer";
import createScreenControler from "./screenControler";
import createApp from "./app"
import { format } from "date-fns";

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  const app = createApp([]);

  const populateProjects = () =>{
    const projectsList = JSON.parse(localStorage.getItem("projects"))
    projectsList.projects.forEach((project) => {
        app.createProject(project.name)
    })
  }

  const populateTasks = () =>{
    const taskList = Json.parse(localStorage.getItem("tasks"))
    taskList.tasks.forEach((task)=>{
        const projectName = task.project
        const projectId = app.getProjectId(projectName)
        app.createTask(task.title ,task.description, task.date, task.priority, task.checked, projectId)
    })
  }

  const populateApp = () =>{
    populateProjects();
    populateTasks();
  }

  if(storageAvailable("localStorage") && localStorage.getItem("projects")){
        populateApp()
    }else{
        const projectId = app.createProject("nuevo");
        app.createTask("tarea","1",new Date(2023, 9 , 17),"1","1",projectId)
    }

const screenControler = createScreenControler(app);
