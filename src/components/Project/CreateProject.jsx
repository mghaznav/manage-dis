import { useRef, useContext } from "react";

import { ProjectContext } from "../../store/ProjectContextProvider";

import Input from "../General/Input";
import Modal from "../General/Modal";

export default function CreateProject() {
  const { addProject, cancelAddProject } = useContext(ProjectContext);

  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate.trim() === ''
    ) {
      modal.current.open();
      return;
    }

    const project = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    };

    addProject(project);
  }

  return (
    <>
      <Modal ref={modal} closeLabel="Close">
        <div>
          <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
          <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
          <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
        </div>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="py-2 text-stone-800 hover:text-stone-950"
              onClick={cancelAddProject}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" isTextArea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}