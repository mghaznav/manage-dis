import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(
  function Modal({children, closeLabel, ...props}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        }
      };
    })

    return createPortal(
      <dialog
        ref={dialog}
        className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
        {...props}
      >
        {children}
        <form
          className="mt-4"
          method="dialog"
        >
          <Button>{closeLabel}</Button>
        </form>
      </dialog>,
      document.getElementById('modal-root')
    );
  }
);

export default Modal;