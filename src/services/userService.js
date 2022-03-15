import http from "./httpService";

const apiEndpoint = "/users";

export function registerUser(user) {
  return http.post(apiEndpoint, user);
}
