import { default as getRandomInt } from './getRandomInt'
import { default as getArrayWithLen } from './getArrayWithLen'

export default function getRandomArray(size, min = 1, max = 300) {
    return getArrayWithLen(size).map(() => getRandomInt(min, max))
}
