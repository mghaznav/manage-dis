import { createContext, useState } from "react";

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: []
});

export default function ProjectContextProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    addProject: () => {},
    openAddProject: () => {},
    cancelAddProject: () => {},
    deleteProject: () => {},
    selectProject: () => {},
    addTask: () => {},
    deleteTask: () => {}
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

  const context = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    addProject: handleAddProject,
    openAddProject: handleOpenAddProject,
    cancelAddProject: handleCancelAddProject,
    deleteProject: handleDeleteProject,
    selectProject: handleSelectProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask
  };

  return (
    <ProjectContext.Provider value={context} >
      {children}
    </ProjectContext.Provider>
  );
}