//create an adjacency list for every sqaure on the board
//take input of starting space and end space, search breadth first until at end node
class Node {
  constructor(position) {
    this.position = position;
    this.adjacent = [];
  }
}

class ChessBoard {

  constructor() {
    function constructBoard(size) {
      const board = [];

      for (let x = 0; x < size; x++) {
        board.push([]);
        for (let y = 0; y < size; y++) {
          board[x].push(new Node([x, y]));
        }
      }

      return board;
    }

    this.board = constructBoard(8);
  }

  constructKnightGraph() {
    const board = this.board;
    board.forEach( function(xAxis, index) {
      xAxis.forEach( function(node, index) {
        const position = node.position;
        const adjacent = [];

        adjacent.push([position[0] + 1, position[1] + 2]);
        adjacent.push([position[0] + 2, position[1] + 1]);
        adjacent.push([position[0] + 2, position[1] - 1]);
        adjacent.push([position[0] + 1, position[1] - 2]);
        adjacent.push([position[0] - 1, position[1] - 2]);
        adjacent.push([position[0] - 2, position[1] - 1]);
        adjacent.push([position[0] - 2, position[1] + 1]);
        adjacent.push([position[0] - 1, position[1] + 2]);

        adjacent.forEach( (adjacentPos) => {
          if (adjacentPos[0] <= 7 && adjacentPos[0] >= 0 && adjacentPos[1] <= 7 && adjacentPos[1] >= 0) {
            node.adjacent.push(board[adjacentPos[0]][adjacentPos[1]]);
          }
        });
      });
    });
  }

  moveKnight(start, end) {
    let queue = [this.board[start[0]][start[1]]];
    let count = 0;
    while (queue.length > 0) {
      if (queue.length === 1) {
        count++;
      }
      const current = queue.shift();
      if (current.position[0] == end[0] && current.position[1] == end[1]) {
        break;
      } else {
        current.adjacent.forEach( (node) => {
          queue.push(node);
        });
      }
    }
    
    console.log(count)

    //return path from start to end
  }
}

let chessBoard = new ChessBoard();
chessBoard.constructKnightGraph();

chessBoard.moveKnight([0,0], [5, 3])
