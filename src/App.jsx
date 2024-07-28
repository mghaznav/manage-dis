import ProjectContextProvider from "./store/ProjectContextProvider";

import Sidebar from "./components/Main/Sidebar";
import ContentArea from "./components/Main/ContentArea";

function App() {

  return (
    <ProjectContextProvider>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar />
        <ContentArea />
      </main>
    </ProjectContextProvider>
  );
}

export default App;
