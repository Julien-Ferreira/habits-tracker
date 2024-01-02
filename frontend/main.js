import "./style.css";
import { AddHabitDialog } from "./ui/AddHabitDialog";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = new TodayHabits();
todayHabits.init();

const addHabitDialog = new AddHabitDialog();
addHabitDialog.init();
