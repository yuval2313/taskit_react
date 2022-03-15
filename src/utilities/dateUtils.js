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
