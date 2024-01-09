import { deleteHabit, getAllHabits } from "../api/habits-api";

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

  async render() {
    const habit = await getAllHabits();
    const titleButton = this.habitsButton(habit);

    this.dialog.appendChild(titleButton);
  }

  async habitsButton(habits) {
    const wrapper = document.querySelector("#delete-habit-wrapper");
    wrapper.innerText = "";
    habits.forEach((habit) => {
      const button = document.createElement("button");
      const title = createTitleElement(habit.title);
      button.appendChild(title);
      wrapper.appendChild(button);
      button.addEventListener("click", () => {
        const confirmation = window.confirm("Do you want delete this habit ?");

        if (confirmation) {
          deleteHabit(habit.id);
          this.render();
        } else {
          return;
        }
      });
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
      this.dialog.removeAttribute("open", "");
    }
  }
}

const createTitleElement = (title) => {
  const titleSpan = document.createElement("span");
  titleSpan.innerText = title;
  return titleSpan;
};
