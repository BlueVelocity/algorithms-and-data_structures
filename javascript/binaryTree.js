class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data)
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

function populateTree(binaryTree, length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const randNum = Math.round(Math.random() * 100);
    arr.push(randNum);
    binaryTree.insert(randNum);
  }
  console.log(`Original Data: [${arr}]`)
}

const tree = new BinarySearchTree();
populateTree(tree, 10)


console.log(tree)

