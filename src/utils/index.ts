export function debounce(fn: Function, wait: number): (...args: Array<any>) => any {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      fn.apply(null, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
