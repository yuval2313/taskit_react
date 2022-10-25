import http from "../httpService";

const apiEndpoint = `${process.env.REACT_APP_GCAL_API_URL}/colors`;

export async function getColors() {
  return await http.get(apiEndpoint);
}
