function Node(data) {
  return {
    data: data,
    left: null,
    right: null
  }
}

function Tree() {
  return {
    buildTree(arr) {
      this.root = this.constructTreeRecursively(arr);
    },
    constructTreeRecursively(arr) {
      if (arr.length === 0) return null;
      const mid = parseInt(arr.length / 2);
      const node = Node(arr[mid]);

      node.left = this.constructTreeRecursively(arr.slice(0, mid));
      node.right = this.constructTreeRecursively(arr.slice(mid + 1, arr.length));

      return node;
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

const sortedArray = [1, 2, 3, 4, 5, 22, 44, 66,67, 98];
const unsortedArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree();

tree.buildTree(sortedArray);

prettyPrint(tree.root);

tree.buildTree(unsortedArray)

prettyPrint(tree.root)
