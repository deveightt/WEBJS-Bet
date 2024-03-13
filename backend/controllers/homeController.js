// homeController.js
import Station from '../models/Station.js';

let station = new Station(document.getElementById("station-1"));
let debugBTN = document.getElementById("debugBTN");

debugBTN.addEventListener('click', () => {
    station.generatePacket();
});

window.trigger = function () {
    station.triggerBlockPlaced();
};


// JavaScript logic to create the grid
const dropZone = document.querySelector('.dropZone');

// Calculate the number of rows and columns based on the dropZone size and the field size (20px)
const rows = Math.floor(dropZone.clientHeight / 20);
const columns = Math.floor(dropZone.clientWidth / 20);

// Create the grid
dropZone.style.display = 'grid';
dropZone.style.gridTemplateRows = `repeat(${rows}, 20px)`;
dropZone.style.gridTemplateColumns = `repeat(${columns}, 20px)`;

for (let i = 0; i < rows * columns; i++) {
    const gridField = document.createElement('div');
    gridField.classList.add('grid-cell');
    gridField.dataset.x = i % columns;
    gridField.dataset.y = Math.floor(i / columns);
    dropZone.appendChild(gridField);
}

