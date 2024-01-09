import { getTodayHabits, updateHabitDone } from "../api/habits-api.js";
import { HabitSquare } from "./HabitSquare.js";

export class TodayHabits {
  static instance;
  constructor() {
    if (TodayHabits.instance) {
      throw new Error("Use TodayHabits.instance() instead");
    }
  }

  static getInstance() {
    if (!TodayHabits.instance) {
      TodayHabits.instance = new TodayHabits();
    }
    return TodayHabits.instance;
  }

  habitsSquare = [];

  async init() {
    this.element = document.querySelector("#today-habits");
    this.refresh();
  }

  toggle = (event) => {
    const habitSquare = event.currentTarget;
    this.toggleDone(habitSquare.id, habitSquare.done);
  };

  async refresh() {
    try {
      this.todayHabits = await getTodayHabits();
      this.habitsSquare.forEach((habitSquare) =>
        habitSquare.removeEventListener("toggle", this.toggle)
      );
      this.render();
    } catch {
      alert("impossible to refresh");
    }
  }

  async toggleDone(id, done) {
    console.log("toggleDone");
    try {
      await updateHabitDone(id, !done);
      this.refresh();
    } catch {
      alert("Impossible to update habits");
    }
  }

  async render() {
    this.element.innerHTML = "";

    this.habitsSquare = this.todayHabits.map((habit) => {
      const habitSquare = new HabitSquare(habit.id, habit.title, habit.done);
      habitSquare.addEventListener("toggle", this.toggle);

      this.element.appendChild(habitSquare.element);
      return habitSquare;
    });
  }
}
