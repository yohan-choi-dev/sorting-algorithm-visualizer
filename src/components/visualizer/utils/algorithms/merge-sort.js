import { Colors } from '../../enums';
export default function mergeSortWrapper(array, animation) {
  if (!Array.isArray(array)) return;
  mergeSort(array, array, 0, animation);
  return array;
}

function mergeSort(array, originalArray, originalArrayIndex, animation) {
  if (array.length === 1) {
    animation.addFrame();
    animation.addAnimationEffect(
      originalArrayIndex,
      originalArray[originalArrayIndex],
      Colors.YELLOW,
    );
    animation.addFrame();
    animation.addAnimationEffect(originalArrayIndex, originalArray[originalArrayIndex], Colors.RED);
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middle);
  const rightArray = array.slice(middle);

  return merge(
    mergeSort(leftArray, originalArray, originalArrayIndex, animation),
    mergeSort(rightArray, originalArray, middle + originalArrayIndex, animation),
    originalArrayIndex,
    animation,
  );
}

function merge(leftArray, rightArray, originalArrayIndex, animation) {
  const sortedArray = [];
  let leftArrayIndex = 0;
  let rightArrayIndex = 0;

  while (leftArrayIndex < leftArray.length && rightArrayIndex < rightArray.length) {
    animation.addFrame();
    animation.addAnimationEffect(leftArrayIndex + originalArrayIndex, null, Colors.YELLOW);
    animation.addAnimationEffect(rightArrayIndex + originalArrayIndex, null, Colors.YELLOW);

    if (leftArray[leftArrayIndex] <= rightArray[rightArrayIndex]) {
      sortedArray.push(leftArray[leftArrayIndex]);
      animation.addFrame();
      animation.addAnimationEffect(leftArrayIndex + originalArrayIndex, null, Colors.RED);
      animation.addAnimationEffect(rightArrayIndex + originalArrayIndex, null, Colors.BLUE);
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.GREEN,
      );
      animation.addFrame();
      animation.addAnimationEffect(leftArrayIndex + originalArrayIndex, null, Colors.BLUE);

      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.BLUE,
      );

      leftArrayIndex++;
    } else {
      sortedArray.push(rightArray[rightArrayIndex]);
      animation.addFrame();
      animation.addAnimationEffect(rightArrayIndex + originalArrayIndex, null, Colors.RED);
      animation.addAnimationEffect(leftArrayIndex + originalArrayIndex, null, Colors.BLUE);
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.GREEN,
      );
      animation.addFrame();
      animation.addAnimationEffect(rightArrayIndex + originalArrayIndex, null, Colors.BLUE);
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.BLUE,
      );

      rightArrayIndex++;
    }
  }

  if (rightArrayIndex < rightArray.length) {
    for (rightArrayIndex; rightArrayIndex < rightArray.length; rightArrayIndex++) {
      sortedArray.push(rightArray[rightArrayIndex]);
      animation.addFrame();
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.RED,
      );
      animation.addFrame();
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.BLUE,
      );
    }
  } else if (leftArrayIndex < leftArray.length) {
    for (leftArrayIndex; leftArrayIndex < leftArray.length; leftArrayIndex++) {
      sortedArray.push(leftArray[leftArrayIndex]);
      animation.addFrame();
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.RED,
      );
      animation.addFrame();
      animation.addAnimationEffect(
        sortedArray.length + originalArrayIndex - 1,
        sortedArray[sortedArray.length - 1],
        Colors.BLUE,
      );
    }
  }

  return sortedArray;
}
