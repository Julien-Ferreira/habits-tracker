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
    this.tableWrapper = document.querySelector("#table-wrapper");

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

  async render() {
    console.log("render !!!");
    const habits = await getAllHabits();
    const lowestDate = getLowestDate(habits);
    const dateRange = getDateRange(lowestDate);
    const table = document.createElement("table");
    table.appendChild(createTableHeader(dateRange));
    createTableRow(habits, dateRange).forEach((row) => {
      table.appendChild(row);
    });

    this.tableWrapper.innerText = "";
    this.tableWrapper.appendChild(table);
  }

  close() {
    this.open = false;
  }
}

const createTableHeader = (dates) => {
  const headerRow = document.createElement("tr");
  const headerCeil = document.createElement("th");
  headerCeil.textContent = "Habit";
  headerRow.appendChild(headerCeil);

  dates.forEach((date) => {
    const dateCeil = document.createElement("th");
    dateCeil.textContent = date;
    headerRow.appendChild(dateCeil);
  });

  return headerRow;
};

const createTableRow = (habits, dates) => {
  return habits.map((habit) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.innerText = habit.title;
    row.appendChild(cell);

    dates.forEach((date) => {
      const dateCell = document.createElement("td");
      const doneDays = habit.doneDays[date];
      dateCell.textContent = doneDays ? "✅" : "❌";
      row.appendChild(cell);
    });

    return row;
  });
};

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
