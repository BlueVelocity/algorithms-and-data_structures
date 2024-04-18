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
      this.root = this.constructTreeRecursively(this.mergeSort(arr));
    },
    constructTreeRecursively(arr) {
      if (arr.length === 0) return null;

      const mid = Math.floor(arr.length / 2);
      const node = Node(arr[mid]);

      node.left = this.constructTreeRecursively(arr.slice(0, mid));
      node.right = this.constructTreeRecursively(arr.slice(mid + 1, arr.length));

      return node;
    },
    mergeSort(arr) {
      if (arr.length === 1) return arr;
      let left = this.mergeSort(arr.slice(0, Math.round(arr.length / 2)));
      let right = this.mergeSort(arr.slice(Math.round(arr.length / 2)));
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

tree.buildTree(unsortedArray);

prettyPrint(tree.root);
