class Truck {
  constructor(length, width, type) {
    this.length = length;
    this.width = width;
    this.type = type;
    this.grid = this.initializeGrid(length, width);
  }

  initializeGrid(length, width) {
    return Array.from({ length }, () => Array.from({ length: width }, () => 0));
  }

  createTruckElement() {
    const truckWrapper = document.createElement('div');
    truckWrapper.classList.add('truck-wrapper');

    const label = document.createElement('div');
    label.textContent = `${this.type} - ${this.length}x${this.width}`;
    label.classList.add('label');
    truckWrapper.appendChild(label);

    const truck = document.createElement('div');
    truck.classList.add('truck');
    truck.style.display = 'grid';
    truck.style.gridTemplateColumns = `repeat(${this.width}, 30px)`;
    truck.style.gridTemplateRows = `repeat(${this.length}, 30px)`; // Ensure you have this line to set up the grid rows
  
    for (let i = 0; i < this.length * this.width; i++) {
      const block = document.createElement('div');
      block.className = 'truck-block';
      block.style.width = '30px';
      block.style.height = '30px';

      // Set up each grid cell as a drop zone
      block.addEventListener('dragover', event => event.preventDefault());
      block.addEventListener('drop', event => {
          event.preventDefault();
          const tetrominoId = event.dataTransfer.getData('text');
          const tetromino = document.getElementById(tetrominoId);
          if (tetromino) {
              stopTetrominoMovement(tetrominoId);

              // Append the tetromino to the specific grid cell (block)
              block.appendChild(tetromino);
              tetromino.style.position = 'initial'; // Reset styles if necessary
              tetromino.style.transform = 'none'; // Remove any previous transformations
          }
      });

      truck.appendChild(block);
  }

  truckWrapper.appendChild(truck);
  return truckWrapper;
}

  addDropListeners() {
    this.container.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    this.container.addEventListener('drop', (event) => {
        event.preventDefault();
        const tetrominoId = event.dataTransfer.getData('text/plain');
        const tetrominoElement = document.getElementById(tetrominoId);
        if (tetrominoElement) {
            this.container.appendChild(tetrominoElement);
            tetrominoElement.style.position = 'static'; 
        }
    });
  }
}
