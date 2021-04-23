import React, { useState, useEffect, useRef } from "react";

function BoardGen({ board, updatedBoard, difficulty }) {
  const [randomBoardProxy, setRandomBoard] = useState(null);
  useEffect(() => {
    updatedBoard(board);
  }, [board]);
  const solveSudoku = React.useCallback((board) => {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (var n = 0; n <= 9; n++) {
            if (checkIfSafe(board, i, j, n)) {
              board[i][j] = n;
              if (solveSudoku(board)) {
                return board;
              }
            }
          }

          board[i][j] = 0;
          return false;
        }
      }
    }
    return board;
  }, []);
  function checkIfSafe(board, i, j, n) {
    for (var x = 0; x < 9; x++) {
      if (board[i][x] === n) {
        return false;
      }
    }
    for (var y = 0; y < 9; y++) {
      if (board[y][j] === n) {
        return false;
      }
    }

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        let gridY = Math.floor(i / 3) * 3;
        let gridX = Math.floor(j / 3) * 3;
        if (board[gridY + y][gridX + x] === n) {
          return false;
        }
      }
    }
    return true;
  }
  useEffect(() => {
    function randomBoard(board) {
      for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 9; i++) {
          if (board[i][j] === 0) {
            for (let n = Math.floor(Math.random() * 6) + 1; n <= 9; n++) {
              if (checkIfSafe(board, i, j, n)) {
                board[i][j] = n;

                if (solveSudoku(board)) return board;
              }
            }

            board[i][j] = 0;
            return false;
          }
        }
      }

      return board;
    }
    function generateRandomBoard() {
      while (difficulty > 0) {
        board.forEach((x, y) => {
          x = Math.floor(Math.random() * board.length);
          y = Math.floor(Math.random() * board.length);

          board[x][y] = 0;
        });

        difficulty--;
      }
    }
    randomBoard(board);
    generateRandomBoard();
  }, [solveSudoku, board]);
}

export default BoardGen;
