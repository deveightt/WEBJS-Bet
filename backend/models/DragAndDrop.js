// DragAndDrop.js
export function enableDragDrop(element, shape) {
    element.setAttribute('draggable', true);
    element.addEventListener('dragstart', (event) => {
        const offsetX = event.clientX - element.getBoundingClientRect().left;
        const offsetY = event.clientY - element.getBoundingClientRect().top;

        const cellSize = 31; // 30px + 1px gap for each cell
        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);
        const cellIndex = y * shape[0].length + x;
        const cell = element.children[cellIndex];

        if (cell && cell.dataset.isPart === 'true') {
            element.dataset.dragOffsetX = offsetX;
            element.dataset.dragOffsetY = offsetY;
            event.dataTransfer.setData('text/plain', element.id);
            event.dataTransfer.effectAllowed = 'move';
            let childFocusIndex = Array.prototype.indexOf.call(element.children, cell);
            event.target.dataset.childFocusIndex = childFocusIndex;
        } else {
            event.preventDefault();
        }
    });
}

export async function handleDrop(event, container, truck) {
    event.preventDefault();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const targetCell = truck.getTargetCell();
    if (!targetCell) {
        console.log("targetCell not found.");
        return;
    }

    const tetrominoId = event.dataTransfer.getData('text/plain');
    const tetrominoElement = container.querySelector(`#${tetrominoId}`);
    if (!tetrominoElement) {
        console.log("Tetromino not found.");
        return;
    }

    const focusedCellIndex = parseInt(tetrominoElement.dataset.childFocusIndex);
    const tetrominoData = JSON.parse(tetrominoElement.dataset.object);
    const origin = truck.calculateTetrominoOrigin(targetCell, focusedCellIndex, tetrominoData);

    if (!truck.isValidPlacement(origin, tetrominoData)) {
        console.log("Invalid placement.");
        return;
    }

    await truck.placeTetromino(origin, tetrominoData, tetrominoElement);
}
