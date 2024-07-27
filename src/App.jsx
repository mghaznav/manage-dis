import { useState } from "react";

import CreateProject from "./components/Project/CreateProject";
import ViewProject from "./components/Project/ViewProject";

import Empty from "./components/Main/Empty";
import Sidebar from "./components/Main/Sidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          task => task.id !== id
        )
      };
    });
  }

  function handleOpenAddProject() {
    setProjectsState((prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    }));
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  function handleDeleteProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== id
        )
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <CreateProject
                saveProject={handleAddProject}
                handleCancel={handleCancelAddProject}
              />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <Empty onOpenAddProject={handleOpenAddProject} />;
  } else {
    const project = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
    const tasks = projectsState.tasks.filter(task => task.projectId === project.id);

    content = <ViewProject
                project={project}
                tasks={tasks}
                onDeleteProject={handleDeleteProject}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        projects={projectsState.projects}
        onOpenAddProject={handleOpenAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
