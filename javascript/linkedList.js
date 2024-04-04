class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class linkedList {
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
}
