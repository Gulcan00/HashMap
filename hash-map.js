function createHashMap() {
  let buckets = new Array(16);
  let entries = 0;
  const LOAD_FACTOR = 0.75;

  function hash(value) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    }

    return hashCode;
  }

  function set(key, value) {
    const index = hash(key) % buckets.length;

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!buckets[index]) {
      buckets[index] = [];
    }

    buckets[index].push({ key, value });
    entries++;

    if (entries / buckets.length > LOAD_FACTOR) {
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

          newBuckets[newIndex].push({ key: node.key, value: node.value });
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

    const node = buckets[index].find((node) => node.key === key);
    return node.value;
  }

  return {
    set,
    get,
  };
}
