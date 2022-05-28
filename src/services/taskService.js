import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_TASKS;

function taskUrl(taskId) {
  return `${apiEndpoint}/${taskId}`;
}

export function getTasks() {
  return http.get(apiEndpoint);
}

export function getTaskById(taskId) {
  return http.get(taskUrl(taskId));
}

export function deleteTask(taskId) {
  return http.delete(taskUrl(taskId));
}

export function postTask(task) {
  const body = mapToBody(task);
  return http.post(apiEndpoint, body);
}

export function putTask(task) {
  const body = mapToBody(task);
  return http.put(taskUrl(task._id), body);
}

export function mapToBody(task) {
  const { title, content, status, priority, labels } = task;
  return {
    title,
    content,
    status,
    priority,
    labels,
  };
}
