export default function required(argName = 'param') {
  throw new Error(`${argName} is required`);
}
