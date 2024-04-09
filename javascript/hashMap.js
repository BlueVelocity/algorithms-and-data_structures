import {Node, LinkedList} from  "./linkedList.js";

class HashNode extends Node {
  constructor(key, value) {
    super(value);
    this.key = key;
  }
}

class HashLinkedList extends LinkedList {
  append(key, value) {
    const newNode = new HashNode(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.appendNode(this.root, newNode);
    }
  }

  prepend(key, value) {
    const newNode = new HashNode(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      newNode.next = this.root;
      this.root = newNode;
    }
  }

 getValue(key) {
    if (this.root === null) return new Error('Empty list');
    let currentNode = this.root;
    while(currentNode != null) {
      if (currentNode.key === key) return currentNode.data;
      currentNode = currentNode.next;
    }
    return null;
  }
}

class HashMap {
  constructor() {
    this.buckets = []; 
    this.bucketsLength = 16;
  }

//simulates fixed bucket length
  accessBucket(index) {
    if (index < 0 || index >= this.bucketsLength) {
      throw new Error("Trying to access index out of bound");
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber + hashCode + key.charCodeAt(i)) % this.bucketsLength;
    }

    return hashCode;
  }

  set(key, value) {
    const hashVal = this.hash(key);
    this.accessBucket(hashVal);

    if (this.buckets[hashVal] === undefined) {
      const list = new HashLinkedList();
      list.append(key, value);
      this.buckets[hashVal] = list;
    } else {
      this.buckets[hashVal].append(value);
    }
  }

  get(key) {
    const hashVal = this.hash(key);
    this.accessBucket(hashVal);

    return this.buckets[hashVal].getValue(key); 
  }
}

const hashMap = new HashMap();

hashMap.set('customKey', 'customVal');
console.log(hashMap)
