const BASE_URL = "http://127.0.0.1:3000/habits";

export const getTodayHabits = () => {
  return fetch(`${BASE_URL}/today`).then((res) => res.json());
};

export const updateHabitDone = (id, done) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done,
    }),
  }).then((res) => res.json());
};
