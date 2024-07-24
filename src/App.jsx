import { useState } from "react";

import CreateProject from "./components/CreateProject";
import Empty from "./components/Empty";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleAddProject() {
    setProjectsState((prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    }))
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <CreateProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <Empty onAddProject={handleAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onAddProject={handleAddProject} />
      {content}
    </main>
  );
}

export default App;
