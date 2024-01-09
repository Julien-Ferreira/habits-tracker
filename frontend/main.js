import "./style.css";
import { AddHabitDialog } from "./ui/AddHabitDialog";
import { DeleteHabit } from "./ui/DeleteHabit";
import { HabitHistoryDialog } from "./ui/HabitHistoryDialog";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = TodayHabits.getInstance();
todayHabits.init();

const addHabitDialog = AddHabitDialog.getInstance();
addHabitDialog.init();

const habitHistoryDialog = HabitHistoryDialog.getInstance();
habitHistoryDialog.init();

const deleteHabitDialog = DeleteHabit.getInstance();
deleteHabitDialog.init();
