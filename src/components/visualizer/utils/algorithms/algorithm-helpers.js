export function swap(array, firstIndex, secondIndex) {
  [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
}

export function insert(array, currentIndex, newIndex) {
  const target = array.splice(currentIndex, 1)[0];
  array.splice(newIndex, 0, target);
  return newIndex;
}
