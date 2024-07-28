import { useContext } from "react";

import CreateProject from "../Project/CreateProject";
import ViewProject from "../Project/ViewProject";
import Empty from "./Empty";

import { ProjectContext } from "../../store/ProjectContextProvider";

export default function ContentArea() {
  const { projects, tasks, selectedProjectId } = useContext(ProjectContext);

  let content;

  if (selectedProjectId === null) {
    content = <CreateProject />;
  } else if (selectedProjectId === undefined) {
    content = <Empty />;
  } else {
    const project = projects.find(project => project.id === selectedProjectId)
    const projectTasks = tasks.filter(task => task.projectId === project.id);

    content = <ViewProject project={project} tasks={projectTasks} />
  }

  return content;

}