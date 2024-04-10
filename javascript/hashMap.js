class HashNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashLinkedList {
  constructor() {
    this.root = null;
  }

  append(key, value) {
    const newNode = new HashNode(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.appendNode(this.root, newNode);
    }
  }

  appendNode(node, newNode) {
    if (node.next === null) {
      node.next = newNode;
    } else {
      this.appendNode(node.next, newNode);
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
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }
    return null;
  }

  getKeysAndValues() {
    let currentNode = this.root;
    const keyValuePair = [];
    while(currentNode != null) {
      keyValuePair.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.next;
    }
    return keyValuePair;
  }
}

class HashMap {
  constructor() {
    this.buckets = []; 
    this.bucketsLength = 16;
    this.capacity = 0;
    this.loadFactor = 0.75;
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

  growBuckets() {
    this.bucketsLength = this.bucketsLength * 2;
    this.capacity = 0;
    const currentEntries = this.entries();
    this.buckets = [];
    currentEntries.forEach( (entry) => this.set(entry[0], entry[1]));
  }

  set(key, value) {
    const hashVal = this.hash(key);
    this.accessBucket(hashVal);

    if (this.capacity / this.bucketsLength > this.loadFactor) this.growBuckets();

    if (this.buckets[hashVal] === undefined) {
      const list = new HashLinkedList();
      list.append(key, value);
      this.buckets[hashVal] = list;
    } else {
      this.buckets[hashVal].append(key, value);
    }

    this.capacity++;
  }

  get(key) {
    const hashVal = this.hash(key);
    this.accessBucket(hashVal);

    if (this.buckets[hashVal] != undefined) {
      return this.buckets[hashVal].getValue(key); 
    } else {
      console.error(`No Key: '${key}'`);
    }
  }

  has(key) {
    const hashVal = this.hash(key);
    this.accessBucket(hashVal);

    if (this.buckets[hashVal] != undefined) {
      if (this.buckets[hashVal].getValue(key) != undefined); 
    } else {
      console.error(`No Key: '${key}'`);
    }
  }

  remove(key) {

  }

  length() {

  }

  clear() {

  }

  keys() {

  } 

  entries() {
    const nodes = [];
    this.buckets.forEach( (bucketContent) => {
      if (bucketContent != undefined) {
        bucketContent.getKeysAndValues().forEach( (node) => {
          nodes.push(node);
        }) 
      }
    })
    return nodes;
  }
}

function testHashMap(numberOfPairs) {
  const hashMap = new HashMap();

  for (let i = 0; i < numberOfPairs; i++) {
    const key = `Key${i}`, value = `Value${i}`;
    hashMap.set(key, value);
  }

  console.log(hashMap)
}

testHashMap(62);
