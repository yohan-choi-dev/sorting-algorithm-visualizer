import { insert } from './algorithm-helpers';
import { Colors } from '../../enums';

export default function insertionSort(array, animation) {
  if (!Array.isArray(array)) return;
  const length = array.length;
  const lastSortedIndex = 0;
  animation.addFrame();
  animation.addAnimationEffect(lastSortedIndex, array[lastSortedIndex], Colors.BLUE);

  for (let currentIndex = 1; currentIndex < length; currentIndex++) {
    let isSwapped = false;
    let sortedArrayIndex = currentIndex - 1;
    animation.addFrame();
    animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.YELLOW);
    while (!isSwapped) {
      animation.addFrame();
      if (sortedArrayIndex + 1 !== currentIndex) {
        animation.addAnimationEffect(
          sortedArrayIndex + 1,
          array[sortedArrayIndex + 1],
          Colors.BLUE,
        );
      }

      animation.addAnimationEffect(sortedArrayIndex, array[sortedArrayIndex], Colors.YELLOW);

      if (array[currentIndex] >= array[sortedArrayIndex]) {
        animation.addFrame();
        animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.RED);
        animation.addAnimationEffect(sortedArrayIndex, array[sortedArrayIndex], Colors.RED);

        for (let i = currentIndex - 1; i > sortedArrayIndex; i--) {
          animation.addFrame();
          animation.addAnimationEffect(i, array[currentIndex], Colors.RED);
          animation.addAnimationEffect(i + 1, array[i], Colors.BLUE);
        }

        const newCurrent = insert(array, currentIndex, sortedArrayIndex + 1);

        animation.addFrame();
        animation.addAnimationEffect(newCurrent, array[newCurrent], Colors.BLUE);
        animation.addAnimationEffect(sortedArrayIndex, array[sortedArrayIndex], Colors.BLUE);

        break;
      }

      if (array[currentIndex] <= array[sortedArrayIndex] && sortedArrayIndex === 0) {
        animation.addFrame();
        animation.addAnimationEffect(currentIndex, array[currentIndex], Colors.RED);
        animation.addAnimationEffect(sortedArrayIndex, array[sortedArrayIndex], Colors.BLUE);

        for (let i = currentIndex - 1; i > sortedArrayIndex - 1; i--) {
          animation.addFrame();
          animation.addAnimationEffect(i, array[currentIndex], Colors.RED);
          animation.addAnimationEffect(i + 1, array[i], Colors.BLUE);
        }

        const newCurrent = insert(array, currentIndex, sortedArrayIndex);

        animation.addFrame();
        animation.addAnimationEffect(newCurrent, array[newCurrent], Colors.BLUE);
        animation.addAnimationEffect(sortedArrayIndex, array[sortedArrayIndex], Colors.BLUE);

        break;
      }

      sortedArrayIndex--;
    }
  }

  return array;
}
