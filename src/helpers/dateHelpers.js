export function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function isYear(date) {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
}

export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function dateDestructure(date) {
  return {
    year: date.getFullYear().toString(),
    month: padTo2Digits(date.getMonth() + 1),
    day: padTo2Digits(date.getDate()),
    hours: padTo2Digits(date.getHours()),
    minutes: padTo2Digits(date.getMinutes()),
  };
}

export function getEdited(updatedAt) {
  let edited = "Edited: ";

  if (!updatedAt) return null;

  const date = new Date(updatedAt);
  const { year, month, day, hours, minutes } = dateDestructure(date);

  if (isToday(date)) return (edited += `${hours}:${minutes}`);
  if (isYear(date)) return (edited += `${day}/${month}`);
  return (edited += `${day}/${month}/${year}`);
}

export function displayReminderDateTime(dateTime) {
  const date = new Date(dateTime);
  const { year, month, day, hours, minutes } = dateDestructure(date);

  if (isToday(date)) return `- Today at ${hours}:${minutes}`;
  if (isYear(date)) return `- ${day}/${month} at ${hours}:${minutes}`;
  return `- ${day}/${month}/${year} at ${hours}:${minutes}`;
}
