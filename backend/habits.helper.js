import fs from "fs/promises";
import path from "path";

const habitsData = path.join(process.cwd(), "habits.json");

const readDatabase = async () => {
  const habitsFile = await fs.readFile(habitsData, "utf-8");
  const json = JSON.parse(habitsFile);
  return json;
};

const writeDatabase = async (newDatabase) => {
  const database = await readDatabase();

  await fs.writeFile(
    habitsData,
    JSON.stringify({ ...database, ...newDatabase }, null, 2)
  );
};

export const getHabits = async () => {
  const database = await readDatabase();
  return database.habits;
};

export const getTodayHabits = async () => {
  const database = await getHabits();
  const today = new Date().toISOString().slice(0, 10);
  return database.map((habit) => {
    return {
      id: habit.id,
      title: habit.title,
      done: habit.daysDone[today] || false,
    };
  });
};

export const addHabits = async (title) => {
  const habits = await getHabits();
  const newHabit = {
    id: (habits[habits.length - 1].id || 0) + 1,
    title,
    daysDone: {},
  };

  habits.push(newHabit);

  await writeDatabase({ habits });

  return newHabit;
};

export const deleteHabit = async (habitId) => {
  const habits = await getHabits();
  const toDeleteHabits = habits.filter((habit) => habit.id !== habitId);

  if (!toDeleteHabits) {
    throw new Error("HabitId is invalid");
  }

  await writeDatabase({ habits: toDeleteHabits });
  return toDeleteHabits;
};

export const updateHabit = async (habitId, done) => {
  const habits = await getHabits();
  const toEditHabits = habits.find((n) => n.id === habitId);

  if (!toEditHabits) {
    throw new Error("HabitId is invalid");
  }

  const today = new Date().toISOString().slice(0, 10);

  toEditHabits.daysDone[today] = done;

  await writeDatabase({ habits });
  return toEditHabits;
};
