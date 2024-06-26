class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.root = null;
  }
  
  append(data) {
    const newNode = new Node(data);

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

  prepend(data) {
    const newNode = new Node(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      newNode.next = this.root;
      this.root = newNode;
    }
  }

  size() {
    if (this.root === null) return new Error('Empty list');
    let count = 0;
    let currentNode = this.root;
    while(currentNode != null) {
      count += 1;
      currentNode = currentNode.next;
    }
    return count;
  }

  head() {
    if (this.root != null) return this.root;
    return new Error('Empty list')
  }

  tail() {
    if (this.root === null) return new Error('Empty list');
    let currentNode = this.root;
    while(currentNode.next != null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  at(index) {
    if (this.root === null) return new Error('Empty list');
    let currentNode = this.root;
    for (let i = 0; i < index; i++) {
      if (currentNode.next === null) return new Error('Index exceeds list length');
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  pop() {
    if (this.root === null) return new Error('Empty list');
    if (this.root.next === null) {
      this.root = null;
    } else {
      let previousNode = this.root;
      let currentNode = this.root.next;
      while(currentNode.next != null) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = null;
    }
  }

  contains(value) {
    if (this.root === null) return new Error('Empty list');
    let currentNode = this.root;
    while(currentNode != null) {
      if (currentNode.data === value) return true;
      currentNode = currentNode.next;
    }
    return null;
  }

  find(value) {
    if (this.root === null) return new Error('Empty list');
      let currentNode = this.root;
      let index = 0;
      while(currentNode != null) {
        if (currentNode.data === value) return index;
        currentNode = currentNode.next;
        index += 1;
      }
    return null;
  }

  toString() {
    //format (value) -> (value) -> null
    if (this.root === null) return 'null';
    let listString = '';
    let currentNode = this.root;
    while(currentNode != null) {
      listString += `(${currentNode.data}) -> `
      currentNode = currentNode.next;
    }
    listString += 'null'
    return listString;
  }

  insertAt(value, index) {
    try {
      if (this.root === null) return new Error('Empty list');
      let newNode = new Node(value);
      let currentNode = this.root;
      let previousNode = currentNode;
      for(let i = 0; i < index; i++) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      newNode.next = currentNode;
      previousNode.next = newNode; 
    } catch(error) {
      if (error.name === 'TypeError') {
        console.log('Index non-existent');
      } else {
        console.log(error);
      }
    }
  }

  removeAt(index) {
    try {
      if (this.root === null) return new Error('Empty list');
      let currentNode = this.root;
      let previousNode = currentNode;
      for(let i = 0; i < index; i++) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next; 
    } catch (error) {
       if (error.name === 'TypeError') {
        console.log('Index non-existent');
      } else {
        console.log(error);
      }
    }
  }
}

export {Node, LinkedList};
