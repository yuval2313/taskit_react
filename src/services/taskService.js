import http from "./httpService";

const apiEndpoint = "/tasks";

function taskUrl(taskId) {
  return `${apiEndpoint}/${taskId}`;
}

export function getTasks() {
  return http.get(apiEndpoint);
}

export function getTask(taskId) {
  return http.get(taskUrl(taskId));
}

export function deleteTask(taskId) {
  return http.delete(taskUrl(taskId));
}

export function saveTask(task) {
  const body = mapToBody(task);

  if (task._id) {
    return http.put(taskUrl(task._id), body);
  }

  return http.post(apiEndpoint, body);
}

export function mapToBody(task) {
  const { title, content, status } = task;
  return {
    title,
    content,
    status,
  };
}
