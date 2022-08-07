export function getFilteredLabels(labels, searchQuery) {
  const filteredLabels = searchQuery
    ? labels.filter((l) => l.name.match(new RegExp(`${searchQuery}`, "i")))
    : labels;
  return filteredLabels;
}

export function hasMatchingName(labels, searchQuery) {
  const filteredLabels = labels.filter((l) =>
    l.name.match(new RegExp(`^${searchQuery}$`))
  );

  return !!filteredLabels.length;
}
