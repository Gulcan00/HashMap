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

    buckets[index].push(key);
    keysCount++;

    if (keysCount / buckets.length > LOAD_FACTOR) {
      // Resize buckets size
      const newSize = buckets.length * 2;
      const newBuckets = new Array(newSize);
      buckets.forEach((bucket) =>
        bucket.forEach((node) => {
          const newIndex = hash(node.key) % newSize;
          if (newIndex < 0 || newIndex >= newBuckets.length) {
            throw new Error("Trying to access index out of bound");
          }
          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = [];
          }

          newBuckets[newIndex].push(node.key);
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

    const node = buckets[index].find((node) => node.key === key);
    return node?.value || null;
  }

  function has(key) {
    const index = hash(key) % buckets.length;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!buckets[index]) {
      return false;
    }

    const node = buckets[index].find((node) => node.key === key);
    return node ? true : false;
  }

  function remove(key) {
    const index = hash(key) % buckets.length;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (buckets[index]) {
      const nodeIndex = buckets[index].indexOf(key);
      if (nodeIndex !== -1) {
        buckets[index].splice(nodeIndex, 1);
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
      bucket.forEach((node) => {
        keysArr.push(node.key);
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
