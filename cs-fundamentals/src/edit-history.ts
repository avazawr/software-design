export class EditHistory {
  private current_value: string;
  private back: string[];
  private forward: string[];

  constructor(current_value: string) {
    this.back = [];
    this.forward = [];
    this.current_value = current_value;
  }

  record(value: string) {
    this.back.push(this.current_value);
    this.current_value = value;
    this.forward.splice(0, this.forward.length);
  }

  undo() {
    if (this.back.length > 0) {
      this.forward.push(this.current_value);
      this.current_value = this.back.pop()!;
    }
  }
  redo() {
    if (this.forward.length > 0) {
      this.back.push(this.current_value);
      this.current_value = this.forward.pop()!;
    }
  }

  get current(): string {
    return this.current_value;
  }

  get canUndo(): boolean {
    return this.back.length > 0;
  }
  get canRedo(): boolean {
    return this.forward.length > 0;
  }
}
