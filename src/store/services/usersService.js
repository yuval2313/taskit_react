import http from "./httpService";

const apiEndpoint = "/users";

export async function getUser() {
  return await http.get(`${apiEndpoint}/me`);
}
