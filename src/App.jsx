import { useState } from "react";

import CreateProject from "./components/CreateProject";
import ViewProject from "./components/ViewProject";

import Empty from "./components/Empty";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleOpenAddProject() {
    setProjectsState((prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    }))
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
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
      }
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== id
        )
      }
    })
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
    content = <ViewProject project={project} onDeleteProject={handleDeleteProject} />
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
