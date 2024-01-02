import { createHabit } from "../api/habits-api";

export class AddHabitDialog {
  constructor() {}

  _open = false;

  init() {
    this.trigger = document.querySelector("#add-new-habit");
    this.dialog = document.querySelector("#add-habit-dialog");
    this.form = document.querySelector("#add-habit-form");

    this.trigger.addEventListener("click", () => {
      this.open = true;
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit(e);
    });
  }

  async handleSubmit(e) {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    try {
      await createHabit(title);
    } catch {
      alert("Error, we can't create this habit");
    }
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
    } else {
      this.dialog.removeAttribute("open");
    }
  }
}
