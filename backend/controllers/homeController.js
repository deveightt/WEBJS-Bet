// HomeController.js
import TetrominoController from './TetrominoController.js';
import WeatherController from './WeatherController.js';
import TruckController from './TruckController.js';
import ConveyorBeltController from './ConveyorBeltController.js';
import { initializeForm } from '../scripts/form.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    const tetrominoController = new TetrominoController();
    const weatherController = new WeatherController('beeecd8942');
    const truckController = new TruckController();
    const conveyorBeltController = new ConveyorBeltController(tetrominoController, document.getElementById('conveyor-belt-container'));

    weatherController.setupWeatherCheckButton();

    document.getElementById('tst-toggle').addEventListener('click', () => {
        conveyorBeltController.belts.forEach(belt => {
            belt.toggleBelt();
        });
    });

});
