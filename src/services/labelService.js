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

export function saveLabel(label) {
  const body = mapToBody(label);

  if (label._id) {
    return http.put(labelUrl(label._id), body);
  }

  return http.post(apiEndpoint, body);
}

export function mapToBody(label) {
  const { name } = label;
  return {
    name,
  };
}
