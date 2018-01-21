// A special array class that can only store the number of items specified by the `limit` argument
class LimitedArray {
  constructor(limit) {
    // You should not be directly accessing this array from your hash table methods
    // Use the getter and setter methods included in this class to manipulate data in this class
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  // Use this getter function to fetch elements from this class
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }
  // Use this setter function to add elements to this class
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(value) {
    const newNode = {
      next: null,
      value,
    };
    // if LinkedList is empty, add a new node that is both the head and the tail, AND RETURN
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    // not empty, so set old tail.next to new Node and insert newNode as tail
    this.tail.next = newNode;
    this.tail = newNode;
  }

  removeHead() {
    // if the LinkedList is empty, do nothing
    if (this.head === null) return;
    // if only 1 element in LinkedList, store the head's value,
    // remove the node, and return stored value
    if (this.head.next === null) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    }
    // more than 1 element, so replace head with its next
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }

  returnKeyIfContainsValue(value) {
    // if no elements, return false (changed false to undefined)
    if (this.head === null) return undefined;
    // define a recursive function that searches Linked List
    const searchLinkedList = (node) => {
      // if we find the value, return true (changed true to value)
      if (node.value[0] === value[0]) return value[1];
      // if we reach the end without finding the value, return false (changed false to undefined)
      if (node.value[0] === null) return undefined;
      // check this node.next's value, and continue recursion until given true or false
      return searchLinkedList(node.next);
    };
  }
}
/* eslint-disable no-bitwise, operator-assignment */
// This is hash function you'll be using to hash keys
// There's some bit-shifting magic going on here, but essentially, all it is doing is performing the modulo operator
// on the given `str` arg (the key) modded by the limit of the limited array
// This simply ensures that the hash function always returns an index that is within the boundaries of the limited array
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

module.exports = {
  LimitedArray,
  getIndexBelowMax,
  LinkedList,
};
