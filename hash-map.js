function createHashMap() {
  let buckets = new Array(16);
  let entriesCount = 0;
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
    entriesCount++;

    if (entriesCount / buckets.length > LOAD_FACTOR) {
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
      const nodeIndex = buckets[index].findIndex((node) => node.key === key);
      if (nodeIndex !== -1) {
        buckets[index].splice(nodeIndex, 1);
      }
    }

    entriesCount--;
  }

  function length() {
    return entriesCount;
  }

  function clear() {
    buckets = new Array(16);
    entriesCount = 0;
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

  function values() {
    const valuesArr = [];
    buckets.forEach((bucket) =>
      bucket.forEach((node) => {
        valuesArr.push(node.value);
      })
    );

    return valuesArr;
  }

  function entries() {
    const entriesArr = [];
    buckets.forEach((bucket) =>
      bucket.forEach((node) => {
        entriesArr.push([node.key, node.value]);
      })
    );

    return entriesArr;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

const hashMap = createHashMap();

console.log("Length", hashMap.length());
console.log("Set, hashMap.set('name', 'John')");
hashMap.set("name", "John");
console.log("Length", hashMap.length());

console.log("Set, hashMap.set('age', 30)");
hashMap.set("age", 30);
console.log("Length", hashMap.length());

console.log("Set, hashMap.set('dob', '01/01/1990')");
hashMap.set("dob", "01/01/1990");
console.log("Length", hashMap.length());

console.log("Set, hashMap.set('address', '123 Street')");
hashMap.set("address", "123 Street");
console.log("Length", hashMap.length());

console.log("Get, hashMap.get('name')");
console.log(hashMap.get("name"));

console.log("Get, hashMap.get('age')");
console.log(hashMap.get("age"));

console.log("Has, hashMap.has('name')");
console.log(hashMap.has("name"));

console.log("Remove, hashMap.remove('name')");
hashMap.remove("name");
console.log("Length", hashMap.length());

console.log("Has, hashMap.has('name')");
console.log(hashMap.has("name"));

console.log("Keys", hashMap.keys());
console.log("Values", hashMap.values());
console.log("Entries", hashMap.entries());

console.log("Clear, hashMap.clear()");
hashMap.clear();
console.log("Length", hashMap.length());
