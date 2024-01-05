import "./style.css";
import { AddHabitDialog } from "./ui/AddHabitDialog";
import { HabitHistoryDialog } from "./ui/HabitHistoryDialog";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = TodayHabits.getInstance();
todayHabits.init();

const addHabitDialog = AddHabitDialog.getInstance();
addHabitDialog.init();

const habitHistoryDialog = new HabitHistoryDialog();
habitHistoryDialog.init();
