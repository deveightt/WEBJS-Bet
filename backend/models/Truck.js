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
    truck.style.gridTemplateColumns = `repeat(${this.width}, 30px)`;

    for (let i = 0; i < this.length * this.width; i++) {
      const block = document.createElement('div');
      block.classList.add('truck-block');
      truck.appendChild(block);
    }

    truckWrapper.appendChild(truck);
    return truckWrapper;
  }

  calculateDropPosition(e) {
    const truckElement = e.currentTarget;
    const rect = truckElement.getBoundingClientRect();
    const x = e.clientX - rect.left; // X-positie binnen de truck
    const y = e.clientY - rect.top; // Y-positie binnen de truck
    const col = Math.floor(x / 30); // Converteer pixel naar kolomindex
    const row = Math.floor(y / 30); // Converteer pixel naar rijindex
    return { col, row };
  }


  makeDropzone() {
    const truckElement = this.createTruckElement();
    truckElement.querySelector('.truck').addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }, false);

    truckElement.querySelector('.truck').addEventListener('drop', (e) => {
      e.preventDefault();
      const tetrominoId = e.dataTransfer.getData('tetrominoId');
      const tetrominoShape = JSON.parse(e.dataTransfer.getData('text'));
      
      // Bepaal drop-positie (deze functionaliteit moet worden geïmplementeerd)
      const { col, row } = this.calculateDropPosition(e);

      if (this.canPlaceTetromino(tetrominoShape, col, row)) {
        this.placeTetromino(tetrominoShape, col, row);
        document.getElementById(tetrominoId).style.display = 'none'; // Verberg de gesleepte tetromino.
        // Hier kun je logica toevoegen om een 'geplaatste' visuele representatie van de tetromino te tonen.
      } else {
        window.returnTetrominoToBelt(tetrominoId); // Verwijst naar de globaal gedefinieerde functie.
      }
    }, false);

    return truckElement;
  }

  canPlaceTetromino(shape, posX, posY) {
    // Controleer of de tetromino binnen de grid past zonder conflicten
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] && (this.grid[y + posY][x + posX] === 1)) {
          return false; // Conflict gedetecteerd
        }
      }
    }
    return true; // Geen conflicten, plaatsing is mogelijk
  }

  placeTetromino(shape, posX, posY) {
    // Markeer de bezette cellen in de grid als bezet
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          this.grid[y + posY][x + posX] = 1;
        }
      }
    }
  }
}
