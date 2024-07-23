import CreateProject from "./components/CreateProject";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar />
      <CreateProject />
    </main>
  );
}

export default App;
