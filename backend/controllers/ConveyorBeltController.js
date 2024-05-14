// controllers/ConveyorBeltController.js
import ConveyorBelt from "../models/ConveyorBelt.js";

class ConveyorBeltController {
    constructor(tetrominoController, parentElement) {
        this.belts = [];
        this.tetrominoController = tetrominoController;
        this.parentElement = parentElement;

        this.createConveyorBelt();
        document.getElementById('addConveyorBelt').addEventListener('click', () => {
            this.createConveyorBelt();
        });

    }

    createConveyorBelt() {
        const id = `conveyorBelt${this.belts.length + 1}`;
        const conveyorBelt = new ConveyorBelt(id, this.tetrominoController);
        conveyorBelt.draw(this.parentElement);
        this.belts.push(conveyorBelt);
    }
}

export default ConveyorBeltController;
