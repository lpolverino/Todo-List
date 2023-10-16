import projects from "./mockUp";
import createDisplayer from "./displayer";
import createScreenControler from "./screenControler";
import createApp from "./app"

const app = createApp([projects.projects]);

const screenControler = createScreenControler(app);

app.createTask("1","1","1","1","1",projects.projects)