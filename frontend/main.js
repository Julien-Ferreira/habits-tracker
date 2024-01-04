import "./style.css";
import { AddHabitDialog } from "./ui/AddHabitDialog";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = TodayHabits.getInstance();
todayHabits.init();

const addHabitDialog = AddHabitDialog.getInstance();
addHabitDialog.init();
