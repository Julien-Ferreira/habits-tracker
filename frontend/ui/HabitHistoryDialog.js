import { getAllHabits } from "../api/habits-api.js";

export class HabitHistoryDialog {
  static instance;
  constructor() {
    if (HabitHistoryDialog.instance) {
      throw new Error("Use HabitHistoryDiablog.instance() instead");
    }
  }

  static getInstance() {
    if (!HabitHistoryDialog.instance) {
      HabitHistoryDialog.instance = new HabitHistoryDialog();
    }
    return HabitHistoryDialog.instance;
  }

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
    const lowestDate = getLowestDate(habits);
    console.log(lowestDate);
  }

  close() {
    this.open = false;
  }
}

const getLowestDate = (habits) => {
  return habits.reduce((acc, habit) => {
    return [...acc, Object.keys(habit.daysDone)];
  }, []);
};
