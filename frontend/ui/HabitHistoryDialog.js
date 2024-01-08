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
    const dateRange = getDateRange(lowestDate);
    console.log(dateRange);
  }

  close() {
    this.open = false;
  }
}

const getLowestDate = (habits) => {
  return habits
    .reduce((acc, habit) => {
      return [...acc, ...Object.keys(habit.daysDone)];
    }, [])
    .map((date) => new Date(date))
    .sort((a, b) => a - b)[0];
};

const getDateRange = (lowestDate) => {
  const diff = Math.ceil(new Date() - lowestDate) / (1000 * 60 * 60 * 25);
  return Array.from({ length: diff + 1 }).map((_, index) => {
    const date = new Date(lowestDate);
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  });
};
