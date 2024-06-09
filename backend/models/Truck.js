// Truck.js
import { handleDrop } from './DragAndDrop.js';
import { createTruckElement } from '../views/TruckCreator.js';

class Truck {
  constructor(length, width, type, container) {
    this.length = length;
    this.width = width;
    this.type = type;
    this.grid = this.initializeGrid(length, width);
    this.container = container;
    this.truckContainer = null;
    this.blocks = [];
    this.mouseCoord = { x: 0, y: 0 };
  }

  initializeGrid(length, width) {
    return Array.from({ length }, () => Array.from({ length: width }, () => ({ filled: false })));
  }

  createTruckElement() {
    return createTruckElement(this);
  }

  async handleDrop(event) {
    await handleDrop(event, this.container, this);
  }

  getTargetCell() {
    const x = this.mouseCoord.x;
    const y = this.mouseCoord.y;
    return this.truckContainer.querySelector(`.truck-block[data-x="${x}"][data-y="${y}"]`);
  }

  calculateTetrominoOrigin(targetCell, focusedCellIndex, tetrominoData) {
    const targetX = parseInt(targetCell.dataset.x);
    const targetY = parseInt(targetCell.dataset.y);

    const tetrominoWidth = tetrominoData.shape[0].length;
    const offsetX = focusedCellIndex % tetrominoWidth;
    const offsetY = Math.floor(focusedCellIndex / tetrominoWidth);

    return { x: targetX - offsetX, y: targetY - offsetY };
  }

  isValidPlacement(origin, tetrominoData) {
    for (let y = 0; y < tetrominoData.shape.length; y++) {
      for (let x = 0; x < tetrominoData.shape[y].length; x++) {
        if (tetrominoData.shape[y][x] === 1) {
          const checkX = origin.x + x;
          const checkY = origin.y + y;
          if (checkX < 0 || checkX >= this.width || checkY < 0 || checkY >= this.length) {
            return false;
          }
          if (this.grid[checkY][checkX].filled) {
            return false;
          }
        }
      }
    }
    return true;
  }

  async placeTetromino(origin, tetrominoData, tetrominoElement) {
    for (const [y, row] of tetrominoData.shape.entries()) {
      for (const [x, cell] of row.entries()) {
        if (cell === 1) {
          const finalX = origin.x + x;
          const finalY = origin.y + y;
          const gridCell = this.truckContainer.querySelector(`.truck-block[data-x="${finalX}"][data-y="${finalY}"]`);
          gridCell.style.backgroundColor = tetrominoData.color;
          gridCell.dataset.filled = 'true';
          this.grid[finalY][finalX].filled = true;
        }
      }
    }

    this.blocks.push(tetrominoElement);
    tetrominoElement.remove();
  }
}

export default Truck;
