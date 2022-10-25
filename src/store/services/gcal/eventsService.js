import http from "../httpService";

const apiEndpoint = `${process.env.REACT_APP_GCAL_API_URL}/calendars`;

function calendarUrl(calendarId) {
  return `${apiEndpoint}/${calendarId}`;
}

function eventUrl(calendarId, eventId) {
  return `${calendarUrl(calendarId)}/${eventId}`;
}

export async function postEvent(calendarId, event) {
  const body = mapToBody(event);
  return await http.post(calendarUrl(calendarId), body);
}

export async function getTaskItEvents(calendarId) {
  return await http.get(calendarUrl(calendarId), {
    params: { privateExtendedProperty: "taskIt=true" },
  });
}

export async function getEventById(calendarId, eventId) {
  return await http.get(eventUrl(calendarId, eventId));
}

export async function deleteEventById(calendarId, eventId) {
  return await http.delete(eventUrl(calendarId, eventId));
}

export async function putEventById(calendarId, event) {
  const body = mapToBody(event);
  return await http.put(eventUrl(calendarId, event.id), body);
}

function mapToBody(event) {
  return {
    ...event,
    extendedProperties: {
      private: {
        taskIt: true,
      },
    },
  };
}
