export default function delay(time, args) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, args), time);
  });
}
