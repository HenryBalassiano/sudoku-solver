import "./App.css";
import BoardGen from "../Algorithims/BoardGen";
import Solver from "../Algorithims/Solver";
import Buttons from "../Components/Buttons";
import GithubCorner from "../Components/GithubCorner";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [puzzle, setPuzzle] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [updatedPuzzle, setUpdatedPuzzle] = useState();
  const [isSolved, setIsSolved] = useState(true);
  const [boardRen, setBoardRen] = useState(false);

  const [difficulty, setDifficulty] = useState(10);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (boardRen) {
      setPuzzle([
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
      setUpdatedPuzzle(null);
      setBoardRen(false);
    }
  }, [boardRen, difficulty, puzzle]);
  BoardGen({
    board: puzzle,
    updatedBoard: setUpdatedPuzzle,
    difficulty: difficulty,
  });

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
  function solveSudoku(board) {
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
  }
  useEffect(() => {
    function makeMove(row, col, value) {
      if (updatedPuzzle) updatedPuzzle[row][col] = value;
    }
    function isSafe(row, col, value) {
      for (let i = 0; i <= 8; i++) {
        if (updatedPuzzle)
          if (value == updatedPuzzle[row][i]) {
            return false;
          }
      }

      for (let i = 0; i <= 8; i++) {
        if (updatedPuzzle)
          if (value == updatedPuzzle[i][col]) {
            return false;
          }
      }

      let row_offset = Math.floor(row / 3) * 3;
      let col_offset = Math.floor(col / 3) * 3;
      for (let i = 0 + row_offset; i <= 2 + row_offset; i++) {
        for (let j = 0 + col_offset; j <= 2 + col_offset; j++) {
          if (updatedPuzzle)
            if (value == updatedPuzzle[i][j]) {
              return false;
            }
        }
      }

      return true;
    }
    function loadGame() {
      let sudoku_squares = createArray(9, 9);

      for (let row = 0; row <= 8; row++) {
        for (let col = 0; col <= 8; col++) {
          sudoku_squares[row][col] = document
            .getElementsByClassName("sudoku")[0]
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr")
            [row].getElementsByTagName("td")
            [col].getElementsByTagName("input")[0];
        }
      }

      for (let row = 0; row <= 8; row++) {
        for (let col = 0; col <= 8; col++) {
          sudoku_squares[row][col].addEventListener("input", function (e) {
            e.target.classList.remove("invalid");

            if (!boardRen && !isSafe(row, col, e.target.value)) {
              e.target.value = "";
              highlight_temporarily(e.target, 1000);
            } else {
              makeMove(row, col, e.target.value);
            }
          });
        }
      }
      for (let row = 0; row <= 8; row++) {
        for (let col = 0; col <= 8; col++) {
          if (updatedPuzzle)
            if (updatedPuzzle[row][col] != 0) {
              let input = sudoku_squares[row][col];
              input.value = updatedPuzzle[row][col];
              input.classList.add("imported_square");
              if (boardRen) {
                for (let row = 0; row <= 8; row++) {
                  for (let col = 0; col <= 8; col++) {
                    sudoku_squares[row][col].value = "";
                    sudoku_squares[row][col].classList.remove(
                      "imported_square"
                    );
                  }
                }
              }
            }
        }
      }
    }

    function createArray(length) {
      var arr = new Array(length || 0),
        i = length;

      if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
      }

      return arr;
    }
    loadGame();

    function highlight_temporarily(obj, timeout_in_ms) {
      obj.classList.add("invalid");
      setTimeout(function () {
        obj.classList.remove("invalid");
      }, timeout_in_ms);
    }
  });

  if (!isSolved && updatedPuzzle) {
    solveSudoku(puzzle);
  }
  if (!isSolved && boardRen) {
    window.location.reload();
  }

  const newBoard = () => {
    setBoardRen(true);
  };
  console.log(boardRen);
  // 5 10 13
  return (
    <div>
      <GithubCorner />
      <Buttons
        setIsSolved={setIsSolved}
        difficulty={setDifficulty}
        newBoard={newBoard}
        setBoardRen={setBoardRen}
        setPuzzle={setPuzzle}
      />
      <h1>
        {difficulty === 5 ? "Easy" : ""}
        {difficulty === 10 ? "Normal" : ""}
        {difficulty === 13 ? "Hard" : ""} Mode
      </h1>
      <table class="sudoku">
        <tbody>
          <tr class="1">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="2">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="3 thick_bottom">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="4">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="5">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="6 thick_bottom">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="7">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="8">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
          <tr class="9">
            <td class="1">
              <input type="text" maxlength="1" />
            </td>
            <td class="2">
              <input type="text" maxlength="1" />
            </td>
            <td class="3 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="4">
              <input type="text" maxlength="1" />
            </td>
            <td class="5">
              <input type="text" maxlength="1" />
            </td>
            <td class="6 thick_right">
              <input type="text" maxlength="1" />
            </td>
            <td class="7">
              <input type="text" maxlength="1" />
            </td>
            <td class="8">
              <input type="text" maxlength="1" />
            </td>
            <td class="9">
              <input type="text" maxlength="1" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
