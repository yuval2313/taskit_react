import http from "./httpService";

const apiEndpoint = "/users";

export function registerUser(user) {
  return http.post(apiEndpoint, user);
}

const users = {
  registerUser,
};

export default users;
