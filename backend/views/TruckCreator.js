// TruckVisual.js
export function createTruckElement(truck) {
    const truckWrapper = document.createElement('div');
    truckWrapper.classList.add('truck-wrapper');

    const label = document.createElement('div');
    label.textContent = `${truck.type} - ${truck.length}x${truck.width}`;
    label.classList.add('label');
    label.classList.add('unselectable');
    truckWrapper.appendChild(label);

    const truckElement = document.createElement('div');
    truckElement.classList.add('truck');
    truckElement.classList.add('drop-zone');
    truckElement.style.display = 'grid';
    truckElement.style.gridTemplateColumns = `repeat(${truck.width}, 30px)`;
    truckElement.style.gridTemplateRows = `repeat(${truck.length}, 30px)`;
    truckElement.dataset.cellSize = 30;

    for (let i = 0; i < truck.length * truck.width; i++) {
        const block = document.createElement('div');
        block.className = 'truck-block';
        block.style.width = '30px';
        block.style.height = '30px';
        block.dataset.x = i % truck.width;
        block.dataset.y = Math.floor(i / truck.width);
        block.dataset.filled = false;
        block.addEventListener('dragover', event => {
            event.preventDefault();
            truck.mouseCoord.x = block.dataset.x;
            truck.mouseCoord.y = block.dataset.y;
        });
        truckElement.appendChild(block);
    }

    truckElement.addEventListener('drop', async (event) => await truck.handleDrop(event));
    truckWrapper.appendChild(truckElement);
    truck.truckContainer = truckWrapper;
    return truckWrapper;
}
