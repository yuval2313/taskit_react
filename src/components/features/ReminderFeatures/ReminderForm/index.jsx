import React, { useState, useEffect, useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import { useDispatch, useSelector } from "react-redux";
import {
  addReminder,
  getTaskReminder,
} from "../../../../store/entities/reminders";

import DatePicker from "react-datepicker";
import Separator from "./../../../common/Separator/index";
import Input from "../../../common/Input";
import Button from "../../../common/Button";

import { isToday } from "../../../../helpers/dateHelpers";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./index.module.scss";
function ReminderForm({ handleExit }) {
  const [date, setDate] = useState();

  const { task } = useContext(TaskContext);
  const { priority } = task;

  const dispatch = useDispatch();
  const taskReminder = useSelector(getTaskReminder(task._id));

  useEffect(() => {
    setDate(taskReminder ? taskReminder.dateTime : new Date());
  }, []);

  function isNotPast(date) {
    return date > new Date();
  }

  // TODO: Reminders - add, update, view current
  // 1) Load current task reminder
  // 2) Add new reminder - saved / unsaved task
  // 3) update reminder

  function handleSubmit() {
    if (!isNotPast(date)) return alert("reminder must be set in the future!");
    dispatch(addReminder({ dateTime: date, taskId: task._id }));
    return handleExit();
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Set a Reminder</h2>
      <Separator className={styles.separator} />
      <div className={styles.body}>
        <DatePicker
          dateFormat={"dd MMM yyyy"}
          selected={date}
          onChange={(date) => setDate(date)}
          filterDate={(date) => isToday(date) || isNotPast(date)}
          customInput={<Input />}
          className={styles.datepicker}
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          filterTime={isNotPast}
          customInput={<Input />}
          className={styles.datepicker}
        />
      </div>
      <Button
        className={`${styles.submit} ${
          priority ? styles[priority] : styles.prt_unset
        }`}
        disabled={!isNotPast(date)}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
}

export default ReminderForm;
