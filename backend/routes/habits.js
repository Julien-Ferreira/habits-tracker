import {
  addHabits,
  getHabits,
  getTodayHabits,
  updateHabit,
  deleteHabit,
} from "../habits.helper.js";

export async function habitsRoutes(fastify) {
  fastify.get("/", async (request, reply) => {
    try {
      const habits = await getHabits();
      return habits;
    } catch (e) {
      reply.code(400).send({
        error: e.message,
      });
    }
  });

  fastify.get("/today", async (request, reply) => {
    try {
      const todayHabits = await getTodayHabits();
      return todayHabits;
    } catch (e) {
      reply.code(400).send({
        error: e.message,
      });
    }
  });

  fastify.post("/", async (request, reply) => {
    const body = request.body;

    if (body.title === undefined) {
      reply.code(400).send({
        error: "Title is required in the body",
      });
    }

    try {
      const newHabit = await addHabits(body.title);
      return newHabit;
    } catch (e) {
      reply.code(400).send({
        error: e.message,
      });
    }

    const newHabit = await addHabits(body.title);
    return newHabit;
  });

  fastify.delete("/:habitId", async (request, reply) => {
    const habitId = Number(request.params.habitId);

    if (!habitId || Number.isNaN(habitId)) {
      reply.code(400).send({
        error: "habitId is invalid",
      });
    }

    try {
      const deleteHab = await deleteHabit(habitId);
      return deleteHab;
    } catch (e) {
      reply.code(400).send({
        error: e.message,
      });
    }
  });

  fastify.patch("/:habitId", async (request, reply) => {
    const body = request.body;

    if (body.done === undefined) {
      reply.code(400).send({
        error: "Done is required in the body",
      });
    }

    if (typeof body.done !== "boolean") {
      reply.code(400).send({
        error: "Done value in the body must be a boolean",
      });
    }

    const habitId = Number(request.params.habitId);

    if (!habitId || Number.isNaN(habitId)) {
      reply.code(400).send({
        error: "habitId is invalid",
      });
    }

    try {
      const updateHab = await updateHabit(habitId, body.done);
      return updateHab;
    } catch (e) {
      reply.code(400).send({
        error: e.message,
      });
    }
  });
}
