import { swap } from './algorithm-helpers';
import { Colors } from '../../enums';

export default function bubbleSort(array, animation) {
  if (!Array.isArray(array)) return;

  let lastUnsortedItemIndex = array.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let left = 0, right = 1; right <= lastUnsortedItemIndex; left++, right++) {
      animation.addFrame();
      animation.addAnimationEffect(left, array[left], Colors.YELLOW);
      animation.addAnimationEffect(right, array[right], Colors.YELLOW);
      if (array[left] > array[right]) {
        animation.addFrame();
        animation.addAnimationEffect(left, array[left], Colors.RED);
        animation.addAnimationEffect(right, array[right], Colors.RED);
        swap(array, left, right);
        animation.addFrame();
        animation.addAnimationEffect(left, array[left], Colors.RED);
        animation.addAnimationEffect(right, array[right], Colors.RED);

        animation.addFrame();
        animation.addAnimationEffect(left, array[left], Colors.GRAY);
        animation.addAnimationEffect(right, array[right], Colors.RED);

        swapped = true;
      } else {
        animation.addFrame();
        animation.addAnimationEffect(left, array[left], Colors.GRAY);
        animation.addAnimationEffect(right, array[right], Colors.GRAY);
      }
    }
    animation.addFrame();
    animation.addAnimationEffect(lastUnsortedItemIndex, array[lastUnsortedItemIndex], Colors.BLUE);
    lastUnsortedItemIndex--;
  }
  if (lastUnsortedItemIndex >= 0)
    array.slice(0, lastUnsortedItemIndex + 2).forEach((element, index) => {
      animation.addFrame();
      animation.addAnimationEffect(index, element, Colors.BLUE);
    });
  return array;
}
