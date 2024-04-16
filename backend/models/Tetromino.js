class Tetromino {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
    }

    enableDragDrop(element) {
        element.setAttribute('draggable', true);
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', element.id);
            event.dataTransfer.effectAllowed = 'move';
        });
    }

    draw(container) {
        const tetrominoElement = document.createElement('div');
        tetrominoElement.style.display = 'grid';
        tetrominoElement.style.position = 'absolute';
        tetrominoElement.style.top = '5px';
        tetrominoElement.style.gridTemplateColumns = `repeat(${this.shape[0].length}, 30px)`;
        tetrominoElement.style.gridGap = '1px';

        this.shape.forEach(row => {
            row.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.style.width = '30px';
                cellElement.style.height = '30px';
                cellElement.style.backgroundColor = cell === 1 ? this.color : 'transparent';
                tetrominoElement.appendChild(cellElement);
            });
        });

        tetrominoElement.id = `tetromino-${Math.random().toString(36).substr(2, 9)}`;
        this.enableDragDrop(tetrominoElement);
        container.appendChild(tetrominoElement);
        this.element = tetrominoElement;
        return tetrominoElement;
    }
}


export default Tetromino;