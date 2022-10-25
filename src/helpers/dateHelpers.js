function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
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

export function getEdited(updatedAt) {
  let edited = "Edited: ";

  if (!updatedAt) return null;

  const date = new Date(updatedAt);
  const { year, month, day, hours, minutes } = dateDestructure(date);

  if (isToday(date)) return (edited += `${hours}:${minutes}`);
  if (isYear(date)) return (edited += `${day}/${month}`);
  return (edited += `${day}/${month}/${year}`);
}

export function getJoined(createdAt) {
  let joined = "Joined ";

  if (!createdAt) return null;

  const date = new Date(createdAt);

  return (joined += `${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`);
}
