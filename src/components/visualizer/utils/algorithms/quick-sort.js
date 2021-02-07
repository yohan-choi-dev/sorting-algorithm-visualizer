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
        animation.addAnimeEffect(pivot, array[pivot], Colors.GREEN);

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
        animation.addAnimeEffect(currentIndex, array[currentIndex], Colors.YELLOW);
        animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.YELLOW);
        if (array[currentIndex] < pivotValue) {
            animation.addFrame();
            animation.addAnimeEffect(currentIndex, array[currentIndex], Colors.RED);
            animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.RED);
            swap(array, currentIndex, partitionIndex);
            animation.addFrame();
            animation.addAnimeEffect(currentIndex, array[currentIndex], Colors.RED);
            animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.RED);

            animation.addFrame();
            animation.addAnimeEffect(currentIndex, array[currentIndex], Colors.PUPPLE);
            left === partitionIndex
                ? animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.BLUE)
                : animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.ORANGE);
            partitionIndex++;
        } else {
            animation.addFrame();
            animation.addAnimeEffect(currentIndex, array[currentIndex], Colors.PUPPLE);
        }
    }
    animation.addFrame();
    animation.addAnimeEffect(right, array[right], Colors.RED);
    animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.RED);

    swap(array, right, partitionIndex);

    animation.addFrame();
    animation.addAnimeEffect(right, array[right], Colors.RED);
    animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.RED);

    animation.addFrame();
    Math.abs(right - partitionIndex === 1)
        ? animation.addAnimeEffect(right, array[right], Colors.BLUE)
        : animation.addAnimeEffect(right, array[right], Colors.PUPPLE);

    animation.addAnimeEffect(partitionIndex, array[partitionIndex], Colors.BLUE);

    return partitionIndex;
}
