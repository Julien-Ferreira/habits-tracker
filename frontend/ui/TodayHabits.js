import { getTodayHabits, updateHabitDone } from "../api/habits-api.js";
import { HabitSquare } from "./HabitSquare.js";

export class TodayHabits {
  constructor() {}

  habitsSquare = [];

  async init() {
    this.element = document.querySelector("#today-habits");
    this.refresh();
  }

  async refresh() {
    try {
      this.todayHabits = await getTodayHabits();
      this.render();
    } catch {
      alert("impossible to refresh");
    }
  }

  async toggle(id, done) {
    console.log("toggle");
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
      habitSquare.addEventListener("toggle", () => {
        console.log("event");
        this.toggle(habitSquare.id, habitSquare.done);
      });

      this.element.appendChild(habitSquare.element);
    });
  }
}

// class HabitSquare extends EventTarget {
//   constructor(id, title, done) {
//     super();
//     this.id = id;
//     this.title = title;
//     this.done = done;

//     this.element = document.createElement("button");
//     this.element.classList.add("habit-square");
//     if (done) {
//       this.element.classList.add("habit-done");
//     }

//     this.element.addEventListener("click", async () => {
//       // Disable the button
//       this.element.disabled = true;

//       // Toggle the done state
//       this.done = !this.done;
//       doneElement.innerText = this.done ? "✅" : "❌";

//       if (this.done) {
//         this.element.classList.add("habit-done");
//       } else {
//         this.element.classList.remove("habit-done");
//       }

//       // Call the API to update the habit status
//       await updateHabitDone(this.id, this.done);

//       // Enable the button
//       this.element.disabled = false;
//     });

//     const titleElement = document.createElement("span");
//     titleElement.innerText = title;
//     this.element.appendChild(titleElement);

//     const doneElement = document.createElement("span");
//     doneElement.innerText = done ? "✅" : "❌";
//     this.element.appendChild(doneElement);
//   }
// }
