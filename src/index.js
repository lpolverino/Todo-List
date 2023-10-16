import projects from "./mockUp";
import createDisplayer from "./displayer";
import createScreenControler from "./screenControler";
import createApp from "./app"

const app = createApp([]);
const projectId = app.createProject("nuevo");
app.createTask("tarea","1","1","1","1",projectId)
const screenControler = createScreenControler(app);
