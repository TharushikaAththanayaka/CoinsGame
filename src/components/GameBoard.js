import React, { useState, useEffect, useRef } from 'react';
import Flower from './Flower';
import './GameBoard.css';

// Bright, vibrant flower colors
const COLORS = ['coral', 'skyblue', 'gold', 'lime', 'magenta'];
const BOARD_SIZE = 5;

const GameBoard = ({ isGameActive, onScoreUpdate }) => {
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchingCells, setMatchingCells] = useState(new Set());
  const boardRef = useRef(null);

  // Initialize board with random flowers (ensuring no initial matches)
  useEffect(() => {
    if (board.length === 0) {
      initializeBoard();
    }
  }, []);

  const initializeBoard = () => {
    let newBoard = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      newBoard[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        let color = getRandomColor();
        // Avoid initial matches
        while (
          (row >= 2 && newBoard[row - 1][col] === color && newBoard[row - 2][col] === color) ||
          (col >= 2 && newBoard[row][col - 1] === color && newBoard[row][col - 2] === color)
        ) {
          color = getRandomColor();
        }
        newBoard[row][col] = color;
      }
    }
    setBoard(newBoard);
  };

  const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  const areAdjacent = (pos1, pos2) => {
    const { row: r1, col: c1 } = pos1;
    const { row: r2, col: c2 } = pos2;
    return (
      (Math.abs(r1 - r2) === 1 && c1 === c2) ||
      (Math.abs(c1 - c2) === 1 && r1 === r2)
    );
  };

  const findMatches = (boardState) => {
    const matches = new Set();

    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
      let count = 1;
      let currentColor = boardState[row][0];
      for (let col = 1; col < BOARD_SIZE; col++) {
        const cellColor = boardState[row][col];
        // Only match non-null cells
        if (cellColor !== null && cellColor === currentColor) {
          count++;
        } else {
          if (count >= 3 && currentColor !== null) {
            for (let i = col - count; i < col; i++) {
              matches.add(`${row}-${i}`);
            }
          }
          count = 1;
          currentColor = cellColor;
        }
      }
      if (count >= 3 && currentColor !== null) {
        for (let i = BOARD_SIZE - count; i < BOARD_SIZE; i++) {
          matches.add(`${row}-${i}`);
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
      let count = 1;
      let currentColor = boardState[0][col];
      for (let row = 1; row < BOARD_SIZE; row++) {
        const cellColor = boardState[row][col];
        // Only match non-null cells
        if (cellColor !== null && cellColor === currentColor) {
          count++;
        } else {
          if (count >= 3 && currentColor !== null) {
            for (let i = row - count; i < row; i++) {
              matches.add(`${i}-${col}`);
            }
          }
          count = 1;
          currentColor = cellColor;
        }
      }
      if (count >= 3 && currentColor !== null) {
        for (let i = BOARD_SIZE - count; i < BOARD_SIZE; i++) {
          matches.add(`${i}-${col}`);
        }
      }
    }

    return matches;
  };

  const swapCells = (pos1, pos2) => {
    const newBoard = board.map(row => [...row]);
    const temp = newBoard[pos1.row][pos1.col];
    newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
    newBoard[pos2.row][pos2.col] = temp;
    return newBoard;
  };

  const removeMatches = (boardState, matches) => {
    if (matches.size === 0) return boardState;

    const newBoard = boardState.map(row => [...row]);
    const flowersRemoved = {};

    matches.forEach((matchKey) => {
      const [row, col] = matchKey.split('-').map(Number);
      const color = newBoard[row][col];
      if (color) {
        flowersRemoved[color] = (flowersRemoved[color] || 0) + 1;
      }
      newBoard[row][col] = null;
    });

    // Update score
    Object.entries(flowersRemoved).forEach(([color, count]) => {
      onScoreUpdate(count * 5, color, count);
    });

    return newBoard;
  };

  const dropFlowers = (boardState) => {
    const newBoard = boardState.map(row => [...row]);

    // Drop flowers down
    for (let col = 0; col < BOARD_SIZE; col++) {
      let writeIndex = BOARD_SIZE - 1;
      for (let row = BOARD_SIZE - 1; row >= 0; row--) {
        if (newBoard[row][col] !== null) {
          if (writeIndex !== row) {
            newBoard[writeIndex][col] = newBoard[row][col];
            newBoard[row][col] = null;
          }
          writeIndex--;
        }
      }
    }

    // Fill empty spaces from top
    for (let col = 0; col < BOARD_SIZE; col++) {
      for (let row = 0; row < BOARD_SIZE; row++) {
        if (newBoard[row][col] === null) {
          newBoard[row][col] = getRandomColor();
        }
      }
    }

    return newBoard;
  };

  const handleCellClick = (row, col) => {
    if (!isGameActive || isAnimating) return;

    if (selectedCell === null) {
      setSelectedCell({ row, col });
    } else {
      const clickedPos = { row, col };
      if (selectedCell.row === row && selectedCell.col === col) {
        // Deselect if clicking the same cell
        setSelectedCell(null);
      } else if (areAdjacent(selectedCell, clickedPos)) {
        // Attempt swap
        attemptSwap(selectedCell, clickedPos);
        setSelectedCell(null);
      } else {
        // Select new cell
        setSelectedCell(clickedPos);
      }
    }
  };

  const attemptSwap = (pos1, pos2) => {
    setIsAnimating(true);

    // Perform swap
    let newBoard = swapCells(pos1, pos2);
    const matches = findMatches(newBoard);

    if (matches.size > 0) {
      // Valid swap - process matches and cascades
      setBoard(newBoard);
      
      setTimeout(() => {
        processMatchesAndCascades(newBoard);
      }, 300);
    } else {
      // Invalid swap - revert
      newBoard = swapCells(pos1, pos2); // Swap back
      setBoard(newBoard);
      setIsAnimating(false);
    }
  };

  const processMatchesAndCascades = (currentBoard) => {
    let boardState = currentBoard.map(row => [...row]);

    const processCycle = () => {
      const matches = findMatches(boardState);
      
      if (matches.size > 0) {
        // Show matching animation
        setMatchingCells(matches);
        
        // Remove matches after animation
        setTimeout(() => {
          boardState = removeMatches(boardState, matches);
          setBoard(boardState.map(row => [...row]));
          setMatchingCells(new Set());

          // Drop and refill
          setTimeout(() => {
            boardState = dropFlowers(boardState);
            setBoard(boardState.map(row => [...row]));

            // Check for cascading matches
            setTimeout(() => {
              const newMatches = findMatches(boardState);
              if (newMatches.size > 0) {
                processCycle();
              } else {
                setIsAnimating(false);
              }
            }, 400);
          }, 400);
        }, 500); // Match animation duration
      } else {
        setIsAnimating(false);
      }
    };

    processCycle();
  };

  return (
    <div className="game-board" ref={boardRef} data-testid="game-board">
      {board.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <Flower
            key={`${rowIndex}-${colIndex}`}
            color={color}
            row={rowIndex}
            col={colIndex}
            isSelected={
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex
            }
            isMatching={matchingCells.has(`${rowIndex}-${colIndex}`)}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;

