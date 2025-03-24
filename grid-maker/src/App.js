import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // State variables
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [selectedColor, setSelectedColor] = useState("#ff0000"); // Default red
  const tableRef = useRef(null);

  // Initialize the grid when component mounts
  useEffect(() => {
    createGrid();
  }, []);

  // FEATURE: Grid Creation
  // Creates the initial grid with specified rows and columns
  const createGrid = () => {
    const table = tableRef.current;
    if (!table) return;

    // Clear the table
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    // Create new rows and cells
    for (let i = 0; i < rows; i++) {
      const row = table.insertRow();
      for (let j = 0; j < columns; j++) {
        const cell = row.insertCell();
        cell.onclick = () => handleCellClick(cell);
        cell.style.backgroundColor = "white"; // Initial color
      }
    }
  };

  // FEATURE: Color Single Cell
  // Handles coloring a single cell when clicked
  const handleCellClick = (cell) => {
    cell.style.backgroundColor = selectedColor;
  };
}

export default App;
