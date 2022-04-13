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

export function getEdited(updatedAt) {
  let edited = "Edited: ";

  if (!updatedAt) return null;

  const date = new Date(updatedAt);

  const year = date.getFullYear().toString();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());
  const hours = padTo2Digits(date.getHours());
  const minutes = padTo2Digits(date.getMinutes());

  if (isToday(date)) return (edited += `${hours}:${minutes}`);
  if (isYear(date)) return (edited += `${day}/${month}`);
  return (edited += `${day}/${month}/${year}`);
}
