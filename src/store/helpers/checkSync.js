import _ from "lodash";

export default function checkSync(list, cachedList) {
  return _.isEqual(list, cachedList);
}
