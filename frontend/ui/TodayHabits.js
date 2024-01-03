import { getTodayHabits, updateHabitDone } from "../api/habits-api.js";
import { HabitSquare } from "./HabitSquare.js";

export class TodayHabits {
  constructor() {}

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
