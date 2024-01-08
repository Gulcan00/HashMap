function createHashSet() {
  let buckets = new Array(16);
  let keysCount = 0;
  const LOAD_FACTOR = 0.75;

  function hash(value) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    }

    return hashCode;
  }

  function set(key) {
    const index = hash(key) % buckets.length;

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!buckets[index]) {
      buckets[index] = [];
    }

    if (!buckets[index].includes(key)) {
      buckets[index].push(key);
      keysCount++;
    }

    if (keysCount / buckets.length > LOAD_FACTOR) {
      // Resize buckets size
      const newSize = buckets.length * 2;
      const newBuckets = new Array(newSize);
      buckets.forEach((bucket) =>
        bucket.forEach((k) => {
          const newIndex = hash(k) % newSize;
          if (newIndex < 0 || newIndex >= newBuckets.length) {
            throw new Error("Trying to access index out of bound");
          }
          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = [];
          }

          newBuckets[newIndex].push(k);
        })
      );
      buckets = newBuckets;
    }
  }

  function get(key) {
    const index = hash(key) % buckets.length;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!buckets[index]) {
      return false;
    }

    const keyFromBucket = buckets[index].find((k) => k === key);
    return keyFromBucket || null;
  }

  function has(key) {
    const index = hash(key) % buckets.length;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!buckets[index]) {
      return false;
    }

    const keyFromBucket = buckets[index].find((k) => k === key);
    return keyFromBucket ? true : false;
  }

  function remove(key) {
    const index = hash(key) % buckets.length;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (buckets[index]) {
      const keyIndex = buckets[index].indexOf(key);
      if (keyIndex !== -1) {
        buckets[index].splice(keyIndex, 1);
      }
    }

    keysCount--;
  }

  function length() {
    return keysCount;
  }

  function clear() {
    buckets = new Array(16);
    keysCount = 0;
  }

  function keys() {
    const keysArr = [];
    buckets.forEach((bucket) =>
      bucket.forEach((key) => {
        keysArr.push(key);
      })
    );

    return keysArr;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
  };
}
