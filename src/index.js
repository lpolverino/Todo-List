import projects from "./mockUp";
import createDisplayer from "./displayer";
import createScreenControler from "./screenControler";
import createApp from "./app"
import { format } from "date-fns";

const app = createApp([]);
const projectId = app.createProject("nuevo");
app.createTask("tarea","1",new Date(2023, 9 , 17),"1","1",projectId)
const screenControler = createScreenControler(app);
