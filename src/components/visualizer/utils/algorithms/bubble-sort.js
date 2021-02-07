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
            animation.addAnimeEffect(left, array[left], Colors.YELLOW);
            animation.addAnimeEffect(right, array[right], Colors.YELLOW);
            if (array[left] > array[right]) {
                animation.addFrame();
                animation.addAnimeEffect(left, array[left], Colors.RED);
                animation.addAnimeEffect(right, array[right], Colors.RED);
                swap(array, left, right);
                animation.addFrame();
                animation.addAnimeEffect(left, array[left], Colors.RED);
                animation.addAnimeEffect(right, array[right], Colors.RED);

                animation.addFrame();
                animation.addAnimeEffect(left, array[left], Colors.GRAY);
                animation.addAnimeEffect(right, array[right], Colors.RED);

                swapped = true;
            } else {
                animation.addFrame();
                animation.addAnimeEffect(left, array[left], Colors.GRAY);
                animation.addAnimeEffect(right, array[right], Colors.GRAY);
            }
        }
        animation.addFrame();
        animation.addAnimeEffect(lastUnsortedItemIndex, array[lastUnsortedItemIndex], Colors.BLUE);
        lastUnsortedItemIndex--;
    }
    if (lastUnsortedItemIndex >= 0)
        array.slice(0, lastUnsortedItemIndex + 2).forEach((element, index) => {
            animation.addFrame();
            animation.addAnimeEffect(index, element, Colors.BLUE);
        });
    return array;
}
