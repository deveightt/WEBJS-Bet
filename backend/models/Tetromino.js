// Tetromino.js
import { enableDragDrop } from './DragAndDrop.js';

class Tetromino {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.element = null;
    }

    draw() {
        const tetrominoElement = document.createElement('div');
        tetrominoElement.style.display = 'grid';
        tetrominoElement.style.position = 'absolute';
        tetrominoElement.style.top = '5px';
        tetrominoElement.style.gridTemplateColumns = `repeat(${this.shape[0].length}, 30px)`;
        tetrominoElement.style.gridGap = '1px';
        tetrominoElement.dataset.object = JSON.stringify(this);

        this.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellElement = document.createElement('div');
                cellElement.style.width = '30px';
                cellElement.style.height = '30px';
                cellElement.style.backgroundColor = cell === 1 ? this.color : 'transparent';
                cellElement.dataset.isPart = cell === 1 ? 'true' : 'false';
                cellElement.dataset.relativeX = x;
                cellElement.dataset.relativeY = y;
                tetrominoElement.appendChild(cellElement);
            });
        });

        tetrominoElement.id = `tetromino-${Math.random().toString(36).substr(2, 9)}`;
        enableDragDrop(tetrominoElement, this.shape);

        this.element = tetrominoElement;
        return tetrominoElement;
    }
}

export default Tetromino;
