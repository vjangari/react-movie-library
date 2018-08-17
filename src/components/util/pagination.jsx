import _ from "lodash";
export function paginate(items, currentPage, itemCountPerPage) {
  const startIndex = (currentPage - 1) * itemCountPerPage;

  return _(items)
    .slice(startIndex)
    .take(itemCountPerPage)
    .value();
}
