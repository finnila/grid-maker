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
// FEATURE: Add Row
// Adds a new row to the grid
const addRow = () => {
  const table = tableRef.current;
  if (!table) return;

  const newRow = table.insertRow();
  for (let j = 0; j < columns; j++) {
    const cell = newRow.insertCell();
    cell.onclick = () => handleCellClick(cell);
    cell.style.backgroundColor = "white";
  }

  setRows(rows + 1);
};

// FEATURE: Add Column
// Adds a new column to the grid
const addColumn = () => {
  const table = tableRef.current;
  if (!table) return;

  const tableRows = table.getElementsByTagName("tr");
  for (let i = 0; i < tableRows.length; i++) {
    const cell = tableRows[i].insertCell();
    cell.onclick = () => handleCellClick(cell);
    cell.style.backgroundColor = "white";
  }

  setColumns(columns + 1);
};
// FEATURE: Remove Row
// Removes the last row from the grid
const removeRow = () => {
  if (rows > 1) {
    const table = tableRef.current;
    if (!table) return;

    table.deleteRow(rows - 1);
    setRows(rows - 1);
  }
};
// FEATURE: Remove Column
// Removes the last column from the grid
const removeColumn = () => {
  if (columns > 1) {
    const table = tableRef.current;
    if (!table) return;

    const tableRows = table.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
      if (tableRows[i].cells.length > 0) {
        tableRows[i].deleteCell(columns - 1);
      }
    }

    setColumns(columns - 1);
  }
};
// FEATURE: Color All Uncolored Cells
// Colors all cells that are currently white with the selected color
const colorAllUncolored = () => {
  const cells = tableRef.current.querySelectorAll("td");
  cells.forEach((cell) => {
    if (cell.style.backgroundColor === "white") {
      cell.style.backgroundColor = selectedColor;
    }
  });
};

// FEATURE: Color All Cells
// Colors all cells with the selected color regardless of their current color
const colorAll = () => {
  const cells = tableRef.current.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.style.backgroundColor = selectedColor;
  });
};

// FEATURE: Clear All Cells
// Resets all cells to white color
const clearAll = () => {
  const cells = tableRef.current.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
};

return (
  <div className="app-container">
    <h1>Grid Coloring App</h1>

    {/* FEATURE: Action Buttons */}
    <div className="controls">
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={removeRow}>Remove Row</button>
      <button onClick={removeColumn}>Remove Column</button>
      <button onClick={colorAllUncolored}>Fill Uncolored</button>
      <button onClick={colorAll}>Fill All</button>
      <button onClick={clearAll}>Clear</button>

      {/* FEATURE: Color Selection UI */}
      <div className="color-selector">
        <label htmlFor="color-select">Select Color:</label>
        <select
          id="color-select"
          value={selectedColor}
          onChange={handleColorChange}
        >
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
          <option value="#ffff00">Yellow</option>
          <option value="#ff00ff">Magenta</option>
          <option value="#00ffff">Cyan</option>
          <option value="#000000">Black</option>
        </select>
      </div>
    </div>

    {/* FEATURE: Grid Display */}
    <div className="grid-container">
      <table ref={tableRef} className="grid-table"></table>
    </div>
  </div>
);
export default App;
