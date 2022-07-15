import _ from "lodash";

export default function checkSync(state, previousState) {
  return _.isEqual(state, previousState);
}
