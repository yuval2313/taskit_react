import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    //FIXME: Use logging service (such as Sentry)
    console.log(error);
    //FIXME: Use better notifications (such as toast npm)
    alert("An unexpected error has occured :(");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

export default http;
