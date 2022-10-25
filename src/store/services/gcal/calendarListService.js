import http from "../httpService";

const apiEndpoint = `${process.env.REACT_APP_GCAL_API_URL}/users/me/calendarList`;

export async function getCalendarList() {
  return await http.get(apiEndpoint, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
