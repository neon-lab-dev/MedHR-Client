const debounce = <T extends any[], R>(
  func: (...args: T) => R,
  delay = 300
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
