import http from "./httpService";

const apiEndpoint = "/labels";

function labelUrl(labelId) {
  return `${apiEndpoint}/${labelId}`;
}

export function getLabels() {
  return http.get(apiEndpoint);
}

export function getLabel(labelId) {
  return http.get(labelUrl(labelId));
}

export function deleteLabel(labelId) {
  return http.delete(labelUrl(labelId));
}

export function postLabel(label) {
  const body = mapToBody(label);
  return http.post(apiEndpoint, body);
}

export function putLabel(label) {
  const body = mapToBody(label);
  return http.put(labelUrl(label._id), body);
}

export function mapToBody(label) {
  const { name } = label;
  return {
    name,
  };
}
