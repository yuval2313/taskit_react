import _ from "lodash";

function handleIteratees(sortBy) {
  return (task) => {
    let iterate = task[sortBy];

    if (sortBy === "title") iterate = task[sortBy].toLowerCase();
    if (sortBy === "status") {
      const statusOrder = { "": 0, todo: 1, doing: 2, complete: 3 };
      iterate = statusOrder[task[sortBy]];
    }
    if (sortBy === "priority") {
      const priorityOrder = { "": 0, low: 1, medium: 2, high: 3, urgent: 4 };
      iterate = priorityOrder[task[sortBy]];
    }

    return iterate;
  };
}

export function getSortedTasks(tasks, sortBy, sortOrder) {
  const sortedTasks = _.orderBy(tasks, handleIteratees(sortBy), sortOrder);
  return sortedTasks;
}

export function getFilteredTasks(tasks, searchQuery) {
  const filteredTasks = searchQuery
    ? tasks.filter(
        (t) =>
          t.title.match(new RegExp(`${searchQuery}`, "i")) ||
          t.content.match(new RegExp(`${searchQuery}`, "i"))
      )
    : tasks;
  return filteredTasks;
}

export function getLabeledTasks(tasks, selectedLabelId) {
  const labeledTasks = selectedLabelId
    ? tasks.filter((t) => t.labels.indexOf(selectedLabelId) !== -1)
    : tasks;
  return labeledTasks;
}
