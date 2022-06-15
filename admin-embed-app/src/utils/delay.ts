export function delay(ms = 0) {
  return new Promise(resolve => {
    const timeId = setTimeout(() => {
      resolve(undefined);
      clearTimeout(timeId);
    }, ms);
  });
}
