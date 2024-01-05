// import { getHabits } from "../../backend/habits.helper.js";

import { getAllHabits } from "../api/habits-api.js";

export class HabitHistoryDialog {
  constructor() {}

  _open = false;

  init() {
    this.trigger = document.querySelector("#open-history");
    this.dialog = document.querySelector("#habits-history-dialog");

    this.trigger.addEventListener("click", () => {
      this.open = true;
    });
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
      this.render();
    } else {
      this.dialog.removeAttribute("open");
    }
  }

  // async refresh() {
  //   const database = await getHabits();
  //   return database;
  // }

  async render() {
    console.log("render !!!");
    const habits = await getAllHabits();
    const today = new Date().toISOString().slice(0, 10);
    const dateRange = habits.find(date => )

  }

  close() {
    this.open = false;
  }
}
