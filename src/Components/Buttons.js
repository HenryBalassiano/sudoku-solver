import { useEffect } from "react";

function Buttons({
  reset,
  setIsSolved,
  newBoard,
  difficulty,
  setBoardRen,
  setPuzzle,
}) {
  return (
    <div id="buttons">
      {" "}
      <div className="dropdown" id="difficulty">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Difficulty
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button
            class="dropdown-item"
            type="button"
            onClick={(e) => {
              setBoardRen(true);

              difficulty(5);
            }}
          >
            Easy
          </button>
          <button
            class="dropdown-item"
            type="button"
            onClick={(e) => {
              difficulty(10);
              setBoardRen(true);
            }}
          >
            Normal
          </button>
          <button
            class="dropdown-item"
            type="button"
            onClick={(e) => {
              difficulty(13);
              setBoardRen(true);
            }}
          >
            Hard
          </button>
        </div>
      </div>
      <button
        id="solver"
        className="btn btn-outline-danger"
        onClick={(e) => {
          e.preventDefault();
          setIsSolved(false);
        }}
      >
        Solve
      </button>
      <button
        id="new-board"
        className="btn btn-outline-primary"
        ref={reset}
        onClick={newBoard}
      >
        New Board
      </button>
    </div>
  );
}

export default Buttons;
