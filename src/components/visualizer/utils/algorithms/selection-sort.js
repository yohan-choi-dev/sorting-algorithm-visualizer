import { swap } from './algorithm-helpers';
import { Colors } from '../../enums';

export default function selectionSort(array, animation) {
  const length = array.length;

  for (let left = 0; left < length; left++) {
    let minimum = left;
    for (let right = left + 1; right < length; right++) {
      animation.addFrame();
      animation.addAnimationEffect(minimum, array[minimum], Colors.RED);
      animation.addAnimationEffect(right, array[right], Colors.YELLOW);
      if (array[right] < array[minimum]) {
        animation.addFrame();
        animation.addAnimationEffect(minimum, array[minimum], Colors.RED);
        animation.addAnimationEffect(right, array[right], Colors.RED);

        const previousMinimum = minimum;
        minimum = right;
        animation.addFrame();
        animation.addAnimationEffect(previousMinimum, array[previousMinimum], Colors.GRAY);
        animation.addAnimationEffect(minimum, array[minimum], Colors.RED);
      } else {
        animation.addFrame();
        animation.addAnimationEffect(right, array[right], Colors.GRAY);
      }
    }
    animation.addAnimationEffect(left, array[left], Colors.RED);

    if (left !== minimum) {
      swap(array, left, minimum);
      animation.addFrame();
      animation.addAnimationEffect(minimum, array[minimum], Colors.RED);
      animation.addAnimationEffect(left, array[left], Colors.RED);
      animation.addFrame();
      animation.addAnimationEffect(left, array[left], Colors.BLUE);
      animation.addAnimationEffect(minimum, array[minimum], Colors.GRAY);
    } else {
      animation.addFrame();
      animation.addAnimationEffect(minimum, array[minimum], Colors.BLUE);
    }
  }
  return array;
}
