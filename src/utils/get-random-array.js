import getRandomInt from './get-random-int';
import getArrayWithLen from './get-array-with-len';

export default function getRandomArray(size, min = 1, max = 300) {
  return getArrayWithLen(size).map(() => getRandomInt(min, max));
}
