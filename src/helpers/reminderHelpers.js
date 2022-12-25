import units from "constants/timeIntervalUnits";

export function getReminderInLargestUnit(reminderInMinutes) {
  const data = {
    value: reminderInMinutes,
    unit: "minutes",
    unitValue: 1,
  };

  units.forEach((unit) => {
    if (reminderInMinutes % unit.value === 0) {
      data.value = reminderInMinutes / unit.value;
      data.unit = unit.label;
      data.unitValue = unit.value;
    }
  });

  function getReminderValue() {
    return data.value;
  }

  function getReminderUnit() {
    return data.unit;
  }

  function getReminderUnitValue() {
    return data.unitValue;
  }
  return {
    getReminderValue,
    getReminderUnit,
    getReminderUnitValue,
  };
}
