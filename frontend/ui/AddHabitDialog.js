import { createHabit } from "../api/habits-api";
import { TodayHabits } from "./TodayHabits";

export class AddHabitDialog {
  static instance;
  constructor() {
    if (AddHabitDialog.instance) {
      throw new Error("Use addHabitDialog.instance() instead");
    }
  }

  static getInstance() {
    if (!AddHabitDialog.instance) {
      AddHabitDialog.instance = new AddHabitDialog();
    }
    return AddHabitDialog.instance;
  }

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
      TodayHabits.getInstance().refresh();
    } catch {
      alert("Error, we can't create this habit");
    }

    this.close();
    this.reset();
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

  close() {
    this.open = false;
  }

  reset() {
    this.form.reset();
  }
}
