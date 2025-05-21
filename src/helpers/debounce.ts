const debounce = <T extends any[], R>(func: (...args: T) => R, delay = 300) => {
  let timeoutId: any;
  return function (...args: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
