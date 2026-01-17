export const stringify = data => {
  return JSON.stringify(data, (key, value) => {
    // check if the current value is a map
    if (value instanceof Map) {
      // convert map to a plain object
      return Object.fromEntries(value);
    }
    return value;
  });
};
