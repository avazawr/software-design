import { EditHistory } from "./edit-history";

const history = new EditHistory("");

const input = document.getElementById("text");

const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");

if (!(input instanceof HTMLInputElement)) {
  throw new Error("Element #add-todo not found");
}
if (!(undoBtn instanceof HTMLButtonElement)) {
  throw new Error("Element #add-todo not found");
}
if (!(redoBtn instanceof HTMLButtonElement)) {
  throw new Error("Element #add-todo not found");
}

function updateButtons(
  undoBtn: HTMLButtonElement,
  redoBtn: HTMLButtonElement,
): void {
  undoBtn.disabled = !history.canUndo;
  redoBtn.disabled = !history.canRedo;
}

input.addEventListener("input", (event) => {
  const text = input.value;
  if (text) {
    history.record(text);
    updateButtons(undoBtn, redoBtn);
  }
});

undoBtn.addEventListener("click", (event) => {
  const text = input.value;
  if (history.canUndo) {
    history.undo();
    input.value = history.current;
    updateButtons(undoBtn, redoBtn);
  }
});

redoBtn.addEventListener("click", (event) => {
  const text = input.value;
  if (history.canRedo) {
    history.redo();
    input.value = history.current;
    updateButtons(undoBtn, redoBtn);
  }
});

updateButtons(undoBtn, redoBtn);
