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
    board.forEach( function(xAxis) {
      xAxis.forEach( function(node) {
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

  knightMoves(start, end) {
    if (start[0] > 7 || start[0] < 0 || start[1] > 7 || start[1] < 0)  {
      console.error('Invalid start position');
      return;
    }

    if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
      console.error('Invalid end position');
      return;
    };

    let current = [this.board[start[0]][start[1]], [this.board[start[0]][start[1]].position]];
    const queue  = [current];

    while (queue.length > 0) {
      current = queue.shift();

      if (current[0].position[0] === end[0] && current[0].position[1] === end[1]) {
        break;
      } else {
        current[0].adjacent.forEach( function(node) {
          const newList = current[1].slice(0, current[1].length);

          newList.push(node.position);
          queue.push([node, newList]);
        })
      }
    }
    
    console.log(`The knight made it in ${current[1].length - 1} moves! Here's the path:\n`, current[1]);
  }
}

let chessBoard = new ChessBoard();
chessBoard.constructKnightGraph();

const startCoordinates = [1,0];
const endCoordinates = [7,3];

chessBoard.knightMoves(startCoordinates, endCoordinates);
