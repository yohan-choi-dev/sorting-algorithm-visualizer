import { default as getRandomInt } from './get-random-int';
import { default as getArrayWithLen } from './get-array-with-len';

export default function getRandomArray(size, min = 1, max = 300) {
    return getArrayWithLen(size).map(() => getRandomInt(min, max));
}
