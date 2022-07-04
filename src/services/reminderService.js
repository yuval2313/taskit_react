import http from "./httpService";

const apiEndpoint = "/reminders";

function reminderUrl(reminderId) {
  return `${apiEndpoint}/${reminderId}`;
}

export function getReminders() {
  return http.get(apiEndpoint);
}

export function getReminder(reminderId) {
  return http.get(reminderUrl(reminderId));
}

export function deleteReminder(reminderId) {
  return http.delete(reminderUrl(reminderId));
}

export function postReminder(reminder) {
  const body = mapToBody(reminder);
  return http.post(apiEndpoint, body);
}

export function putReminder(reminder) {
  const body = mapToBody(reminder);
  return http.put(reminderUrl(reminder._id), body);
}

function mapToBody(reminder) {
  const { dateTime, taskId } = reminder;
  return {
    dateTime,
    taskId,
  };
}
