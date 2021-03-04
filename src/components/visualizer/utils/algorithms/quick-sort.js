import { swap } from './algorithm-helpers';
import { Colors } from '../../enums';

export default function mergerSortWrapper(array, animation) {
  if (!Array.isArray(array)) return;
  quickSort(array, 0, array.length - 1, animation);
  return array;
}

function quickSort(array, left = 0, right = array.length - 1, animation) {
  let pivot;
  let parititionIndex;

  if (left < right) {
    pivot = right;

    animation.addFrame();
    animation.addAnimationEffect(pivot, array[pivot], Colors.GREEN);

    parititionIndex = partition(array, pivot, left, right, animation);

    quickSort(array, left, parititionIndex - 1, animation);
    quickSort(array, parititionIndex + 1, right, animation);
  }
  return array;
}

function partition(array, pivot, left, right, animation) {
  const pivotValue = array[pivot];
  let partitionIndex = left;

  for (let currentIndex = left; currentIndex < right; currentIndex++) {
    animation.addFrame();
    animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.YELLOW);
    animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.YELLOW);
    if (array[currentIndex] < pivotValue) {
      animation.addFrame();
      animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.RED);
      animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.RED);
      swap(array, currentIndex, partitionIndex);
      animation.addFrame();
      animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.RED);
      animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.RED);

      animation.addFrame();
      animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.PUPPLE);
      left === partitionIndex
        ? animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.BLUE)
        : animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.ORANGE);
      partitionIndex++;
    } else {
      animation.addFrame();
      animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.PUPPLE);
    }
  }
  animation.addFrame();
  animation.addAnimationEffect(right, array[right], Colors.RED);
  animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.RED);

  swap(array, right, partitionIndex);

  animation.addFrame();
  animation.addAnimationEffect(right, array[right], Colors.RED);
  animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.RED);

  animation.addFrame();
  Math.abs(right - partitionIndex === 1)
    ? animation.addAnimationEffect(right, array[right], Colors.BLUE)
    : animation.addAnimationEffect(right, array[right], Colors.PUPPLE);

  animation.addAnimationEffect(partitionIndex, array[partitionIndex], Colors.BLUE);

  return partitionIndex;
}
