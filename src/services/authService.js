import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser({ email, password }) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginUserWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
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

const auth = {
  loginUser,
  loginUserWithJwt,
  logoutUser,
  getCurrentUser,
};

export default auth;
