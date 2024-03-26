class Tetromino {
    constructor(shape, color, container) {
        this.shape = shape; 
        this.color = color;
        this.container = container;
        this.originalPosition = null;
    }

    // Draw the tetromino on the container
    draw(container) {
        const tetrominoElement = document.createElement('div');
        tetrominoElement.style.display = 'grid';
        tetrominoElement.style.position = 'absolute';
        tetrominoElement.style.top = '5px';
        tetrominoElement.style.gridTemplateColumns = `repeat(${this.shape[0].length}, 30px)`;
        tetrominoElement.style.gridGap = '1px';
        tetrominoElement.draggable = true;
        
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

    enableDragDrop(element) {
        element.addEventListener('dragstart', (e) => {
          this.handleDragStart(e);
          e.dataTransfer.setData('tetrominoId', element.id);
          e.dataTransfer.setData('text', JSON.stringify(this.shape));
        }, false);
        
        element.addEventListener('dragend', this.handleDragEnd.bind(this), false);
      }    

    handleDragStart(e) {
        this.originalPosition = { x: e.clientX, y: e.clientY };
        e.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnd(e) {
        if(!e.dataTransfer.dropEffect || e.dataTransfer.dropEffect === 'none') {
          // Logica om element terug te bewegen (vereist meer implementatie)
          this.element.remove();
          this.draw(this.conveyorBelt);
        }
    }
}

export default Tetromino;