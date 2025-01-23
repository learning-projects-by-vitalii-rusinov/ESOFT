const deepClone = (value, map = new Map()) => {

  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (map.has(value)) {
    return map.get(value);
  }

  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof Map) {
    const result = new Map();
    map.set(value, result);
    value.forEach((v, k) => {
      result.set(deepClone(k, map), deepClone(v, map));
    });
    return result;
  }

  if (value instanceof Set) {
    const result = new Set();
    map.set(value, result);
    value.forEach((v) => {
      result.add(deepClone(v, map));
    });
    return result;
  }

  if (Array.isArray(value)) {
    const result = [];
    map.set(value, result);
    value.forEach((item, index) => {
      result[index] = deepClone(item, map);
    });
    return result;
  }

  const result = Object.create(Object.getPrototypeOf(value));
  map.set(value, result);

  Reflect.ownKeys(value).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(value, key);
    if (desc) {
      if ('value' in desc) {
        desc.value = deepClone(desc.value, map);
      }
      Object.defineProperty(result, key, desc);
    }
  });

  return result;
}
