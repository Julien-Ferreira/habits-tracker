export class DeleteHabit {
  static method;
  constructor() {
    if (DeleteHabit.instance) {
      throw new Error("Use DeleteHabit.instance() instead");
    }
  }

  _open = false;

  static getInstance() {
    if (!DeleteHabit.instance) {
      DeleteHabit.instance = new DeleteHabit();
    }
    return DeleteHabit.instance;
  }

  init() {
    this.trigger = document.querySelector("#delete-habit");
    this.dialog = document.querySelector("#delete-habit-dialog");

    this.trigger.addEventListener("click", () => {
      this.open = true;
    });
  }

  render() {}

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
      this.render();
    } else {
      this.dialog.removeAttribute("open", "");
    }
  }
}
