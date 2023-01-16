import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser(credential) {
  return await http.post(apiEndpoint, { credential });
}

export function loginUserWithJwt(jwt) {
  try {
    http.setJwt(jwt);
    localStorage.setItem(tokenKey, jwt);

    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}
