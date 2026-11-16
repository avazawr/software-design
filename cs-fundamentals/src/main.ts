import { EditHistory } from "./edit-history";

const history = new EditHistory("");

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing element: ${id}`);
  }

  return element as T;
}

const input = getElement<HTMLInputElement>("text");

const undoBtn = getElement<HTMLButtonElement>("undo");
const redoBtn = getElement<HTMLButtonElement>("redo");

updateButtons();

function updateButtons(): void {
  undoBtn.disabled = !history.canUndo;
  redoBtn.disabled = !history.canRedo;
}

input.addEventListener("input", (event) => {
  const text = input.value;
  if (text) {
    history.record(text);
    updateButtons();
  }
});

undoBtn.addEventListener("click", (event) => {
  const text = input.value;
  if (history.canUndo) {
    history.undo();
    input.value = history.current;
    updateButtons();
  }
});

redoBtn.addEventListener("click", (event) => {
  const text = input.value;
  if (history.canRedo) {
    history.redo();
    input.value = history.current;
    updateButtons();
  }
});
