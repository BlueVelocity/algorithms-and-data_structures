function Node(data) {
  return {
    data: data,
    left: null,
    right: null
  }
}

function Tree() {

  function sort(arr) { //recursive merge sort implementation
    if (arr.length === 1) return arr;
    let left = sort(arr.slice(0, Math.round(arr.length / 2)));
    let right = sort(arr.slice(Math.round(arr.length / 2)));
    let sortedArr = [];

    while (left.length > 0 || right.length > 0) {
      if (left[0] === right [0]) {
        right.shift();
      } else if (left[0] >= right[0]) {
        sortedArr.push(right.shift());
      } else if (right[0] >= left[0]) {
        sortedArr.push(left.shift());
      } else if (left.length === 0) {
        sortedArr = sortedArr.concat(right);
        right = [];
      } else {
        sortedArr = sortedArr.concat(left);
        left = [];
      }
    }

    return sortedArr;
  }

  function constructTreeRecursive(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = Node(arr[mid]);

    node.left = constructTreeRecursive(arr.slice(0, mid));
    node.right = constructTreeRecursive(arr.slice(mid + 1, arr.length));

    return node;
  }

  function minValueNode(root) {
    let parentNode = root;
    let currentNode = root.right;

    while (currentNode.left !== null) {
      parentNode = currentNode;
      currentNode = currentNode.left;
    }

    return {parentNode, minNode: currentNode};
  }

  return {
    buildTree(arr) {
      this.root = constructTreeRecursive(sort(arr));
    },

    insert(value) { //iterative approach to inserting a value
      if (typeof value != 'number') {
        console.error(`Cannot insert ${value}`);
      } else {
        let currentNode = this.root;
        const newNode = new Node(value);

        while (currentNode !== newNode) {
          if (currentNode.data === value) {
            console.log(`Value ${value} exists!`);
            break
          } else if (currentNode.data > value) {
            if (currentNode.left === null) {
              currentNode.left = newNode;
              currentNode = currentNode.left;
            } else {
              currentNode = currentNode.left;
            }
          } else {
            if (currentNode.right === null)  {
              currentNode.right = newNode;
              currentNode = currentNode.right;
            } else {
              currentNode = currentNode.right
            }
          }
        }
      }
    },

    deleteItem(value) { //iterative approach to deleting a value
      let currentNode = this.root;
      let parentNode = currentNode;

      while (currentNode !== null) {
        if (currentNode.data === value) {
          break;
        } else if (currentNode.data > value) {
          parentNode = currentNode;
          currentNode = currentNode.left;
        } else {
          parentNode = currentNode;
          currentNode = currentNode.right;
        }
      }

      if (currentNode.data === value) {
        if (currentNode.left === null && currentNode.right === null) {
          if (parentNode.left === currentNode) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        }

        if (currentNode.left === null) {
          parentNode.right = currentNode.right;
        } else if (currentNode.right === null) {
          parentNode.left = currentNode.left;
        } else {
          let minNode = minValueNode(currentNode);
          currentNode.data = minNode.minNode.data;
          minNode.parentNode.left = null;
        }
      }
    },

    find(value) { //iterative approach to finding a value
      let currentNode = this.root;

      while (currentNode !== null) {
        if (currentNode.data === value) {
          break;
        } else if (currentNode.data > value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }

      return currentNode;
    },

    levelOrder(callback) { //iterative breadth-first traversal implementation
      let currentNode = this.root;
      const queue = [currentNode];
      const values = [];

      while (queue.length > 0) {
        let nodeCount = queue.length;
        for (let i = 0; i < nodeCount; i++) {
          let currentNode = queue.shift();

          if (currentNode.left !== null) {
            queue.push(currentNode.left);
          }

          if (currentNode.right !== null) {
            queue.push(currentNode.right);
          }

          values.push(currentNode.data);

          if (callback !== undefined) {
            callback(currentNode);
          }
        }

      }

      if (callback === undefined) {
        return values;
      }
    },

    inOrder(callback) {//iterative in-order depth-first traversal implementation
      const values = [];
      let currentNode = this.root; 
      const stack = [];

      while (currentNode !== null || stack.length !== 0) {
        if (currentNode !== null) {
          stack.push(currentNode);
          currentNode = currentNode.left;
        } else {
          currentNode = stack.pop();
          if (callback !== undefined) {
            callback(currentNode);
          }
          values.push(currentNode.data);
          currentNode = currentNode.right;
        }
      }
      
      if (callback === undefined) {
        return values;
      }
    },

    preOrder(callback) {//iterative pre-order depth-first traversal implementation
      const values = [];
      let currentNode = this.root; 
      const stack = [];

      while (currentNode !== null || stack.length !== 0) {
        if (currentNode !== null) {
          stack.push(currentNode);
          values.push(currentNode.data);
          if (callback !== undefined) {
            callback(currentNode);
          }
          currentNode = currentNode.left;
        } else {
          currentNode = stack.pop();
          currentNode = currentNode.right;
        }
      }
      
      if (callback === undefined) {
        return values;
      }
    },

    postOrder(callback) {//iterative post-order depth-first traversal implementation
      const values = [];
      let currentNode = this.root; 
      const stack = [];

      while (currentNode !== null || stack.length !== 0) {
        if (currentNode === null) {
          currentNode = stack.pop();

          if (currentNode.right === stack[stack.length - 1]) {
            const tempNode = currentNode;
            currentNode = stack.pop();
            stack.push(tempNode);
          } else {
            if (callback !== undefined) {
              callback(currentNode);
            }
            values.push(currentNode.data);
            currentNode = null;
          }
        } else {
          if (currentNode.right !== null) {
            stack.push(currentNode.right);
          } 

          stack.push(currentNode);
          currentNode = currentNode.left;
        }
      }
      
      if (callback === undefined) {
        return values;
      }
    },
    
    height(node) {//iterative approach to find node height
      if (node === null) return 0;
      const queue = [node];
      let level = 0;

      while (queue.length > 0) {
        let nodeCount = queue.length;
        for (let i = 0; i < nodeCount; i++) {
          let currentNode = queue.shift();

          if (currentNode.left !== null) {
            queue.push(currentNode.left);
          }

          if (currentNode.right !== null) {
            queue.push(currentNode.right);
          }
        }

        level++;
      } 

      return level - 1;
    },

    depth(node) {//iterative approach to find node depth
      let count = 0;
      let currentNode = this.root;

      while (currentNode !== null) {
        if (currentNode === node) {
          break;
        } else if (currentNode.data > node.data) {
          count++;
          currentNode = currentNode.left;
        } else {
          count++;
          currentNode = currentNode.right;
        }
      }

      return count;
    },

    isBalanced(root) {//recursive approach to assess if tree balance
      if (root === undefined) {
        root = this.root;
      }

      if (root === null) return true;

      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);

      if (Math.abs(leftHeight - rightHeight) <= 1 && 
        this.isBalanced(root.left) === true && 
        this.isBalanced(root.right) === true) return true;

      return false;
    },

    rebalance() {
      this.root = constructTreeRecursive(this.inOrder());
    },

    root: null
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
   if (node === null) {
     return;
   }
   if (node.right !== null) {
     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
   if (node.left !== null) {
     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
 };

function genRandArr(max) {
  const arr = [];
  for (let i = 0; i < max; i++) {
    let num;
    do {
      num = Math.round(Math.random() * 100);
    } while (num === 0 || num === 100); 

    arr.push(num);
  }
  return arr;
}

//runs a set of functions to create and manipulate a balanced binary tree
function driver() {
  //Create a binary search tree from an array of random numbers < 100.
  const tree = Tree();
  tree.buildTree(genRandArr(100));

  //Confirm that the tree is balanced by calling isBalanced.
  console.log(tree.isBalanced());

  //Print out all elements in level, pre, post, and in order.
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());

  //Unbalance the tree by adding several numbers > 100.
  tree.insert(105);
  tree.insert(115);
  tree.insert(125);
  tree.insert(135);

  //Confirm that the tree is unbalanced by calling isBalanced.
  console.log(tree.isBalanced());

  //Balance the tree by calling rebalance.
  tree.rebalance(); 

  //Confirm that the tree is balanced by calling isBalanced.
  console.log(tree.isBalanced());

  //Print out all elements in level, pre, post, and in order.
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());

  prettyPrint(tree.root);
}

driver();
