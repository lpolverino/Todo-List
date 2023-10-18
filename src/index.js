import {storageAvailable, createStorage} from "./storage";
import createScreenControler from "./screenControler";
import createApp from "./app"

  const app = createApp([]);


  if(storageAvailable("localStorage") && localStorage.getItem("projects")){ 
      app.populate()
    }else{
        if(storageAvailable("localStorage")){
          createStorage()
        }
          const projectId = app.createProject("nuevo");
          app.createTask("tarea","1",new Date(2023, 9 , 17),"1","1",projectId)
      }

const screenControler = createScreenControler(app);
