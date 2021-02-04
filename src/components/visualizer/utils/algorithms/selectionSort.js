import { swap } from './algorithmHelpers';
import { Colors } from '../../enums';

export default function selectionSort(array, animation) {
    const length = array.length;

    for (let left = 0; left < length; left++) {
        let minimum = left;
        for (let right = left + 1; right < length; right++) {
            animation.addFrame();
            animation.addAnimeEffect(minimum, array[minimum], Colors.RED);
            animation.addAnimeEffect(right, array[right], Colors.YELLOW);
            if (array[right] < array[minimum]) {
                animation.addFrame();
                animation.addAnimeEffect(minimum, array[minimum], Colors.RED);
                animation.addAnimeEffect(right, array[right], Colors.RED);

                const previousMinimum = minimum;
                minimum = right;
                animation.addFrame();
                animation.addAnimeEffect(previousMinimum, array[previousMinimum], Colors.GRAY);
                animation.addAnimeEffect(minimum, array[minimum], Colors.RED);
            } else {
                animation.addFrame();
                animation.addAnimeEffect(right, array[right], Colors.GRAY);
            }
        }
        animation.addAnimeEffect(left, array[left], Colors.RED);

        if (left !== minimum) {
            swap(array, left, minimum);
            animation.addFrame();
            animation.addAnimeEffect(minimum, array[minimum], Colors.RED);
            animation.addAnimeEffect(left, array[left], Colors.RED);
            animation.addFrame();
            animation.addAnimeEffect(left, array[left], Colors.BLUE);
            animation.addAnimeEffect(minimum, array[minimum], Colors.GRAY);
        } else {
            animation.addFrame();
            animation.addAnimeEffect(minimum, array[minimum], Colors.BLUE);
        }
    }
    return array;
}
