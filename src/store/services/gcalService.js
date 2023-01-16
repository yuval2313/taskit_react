import http from "./httpService";

const apiEndpoint = "/gcal";

function eventUrl(eventId) {
  return `${apiEndpoint}/${eventId}`;
}

export function authorize(code) {
  return http.post(`${apiEndpoint}/authorize`, { code });
}

export function unauthorize() {
  return http.post(`${apiEndpoint}/unauthorize`);
}

export function createEvent(event) {
  return http.post(apiEndpoint, mapToBody(event));
}

export function getTaskItEvents() {
  return http.get(apiEndpoint);
}

export function deleteEvent(eventId) {
  return http.delete(eventUrl(eventId));
}

export function updateEvent(event) {
  return http.put(eventUrl(event.id), mapToBody(event));
}

function mapToBody(event) {
  const { summary, description, start, end, reminders, colorId, taskId } =
    event;
  return {
    summary,
    description: `Added via Task-it: ${process.env.REACT_APP_URL}/tasks/${taskId}\n\n${description}`,
    start: { dateTime: new Date(start) },
    end: { dateTime: new Date(end) },
    reminders: reminders.length
      ? {
          useDefault: false,
          overrides: reminders.map((reminder) => ({
            method: "popup",
            minutes: reminder,
          })),
        }
      : {
          useDefault: true,
        },
    colorId,
    extendedProperties: {
      private: {
        taskIt: true,
        taskId: taskId,
      },
    },
  };
}
