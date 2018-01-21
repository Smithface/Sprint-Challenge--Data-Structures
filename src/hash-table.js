/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax, LinkedList } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]); // this will break with linked list
      });
    });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index) || [];

    // bucket = bucket.filter(item => item[0] !== key);
    // bucket.push([key, value]);
    // this.storage.set(index, bucket);
    // if bucket is empty, create a new list, add the k,v pair, and push it to bucket, AND RETURN
    if (bucket.length === 0) {
      const newList = new LinkedList();
      newList.addToTail([key, value]);
      bucket.push(newList);
      this.storage.set(index, bucket);
      return;
    }
    // bucket has a LinkedList, so check for key in list
    if (bucket[0].containsKey(key)) {
      bucket[0].replaceValue(key, value);
      this.storage.set(index, bucket);
      return;
    }
    // bucket contains a LinkedList but not our k,v pair
    // add our k,v pair to tail of LinkedList
    bucket[0].addToTail([key, value]);
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (bucket) {
      bucket[0].removeHead();
      this.storage.set(index, bucket);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket) {
      return bucket[0].returnValueIfContainsKey(key);
    }
    return undefined;
  }
}

module.exports = HashTable;
