// controllers/ConveyorBeltController.js
import ConveyorBelt from "../models/ConveyorBelt.js";

class ConveyorBeltController {
    constructor(tetrominoController, container) {
        this.belts = [];
        this.tetrominoController = tetrominoController;
        this.container = container;

        this.createConveyorBelt();
        this.container.querySelector('.addConveyorBelt').addEventListener('click', () => {
            this.createConveyorBelt();
        });
    }

    createConveyorBelt() {
        const id = `conveyorBelt${this.belts.length + 1}`;
        const conveyorBelt = new ConveyorBelt(id, this.tetrominoController);
        conveyorBelt.draw(this.container.querySelector('#conveyor-belt-container'));
        this.belts.push(conveyorBelt);
        if (this.belts.length >= 5) {
            this.container.querySelector('#conveyor-belt-message').innerText = 'Je kan niet meer dan 5 conveyor belts maken!';
            this.container.querySelector('.addConveyorBelt').disabled = true;
        }
    }
}

export default ConveyorBeltController;
