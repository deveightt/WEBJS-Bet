// Station.js
import Block from '../models/Block.js';

class Station {
    constructor(element) {
        this.id = "id" + Math.random().toString(16).slice(2)
        this.packetList = [];
        this.htmlelement = element;
        element.style.display = "flex";  // Set display to flex
        element.style.justifyContent = "center";  // Center horizontally
        element.style.alignItems = "center";  // Center vertically
        element.id = this.id;

        let box = document.createElement('div');
        box.id = 'packetBox';
        box.style.alignContent = 'center';
        element.appendChild(box);

        // Bind the event listener function to the instance
        this.blockPlacedListener = this.blockPlacedListener.bind(this);

        // Add event listener to htmlelement
        this.htmlelement.addEventListener('blockPlaced', this.blockPlacedListener);
    }

    generatePacket() {
        let block = new Block(this.htmlelement);
        this.packetList.push(block);
        this.showPacket(block);
    }

    showPacket(packet) {
        let box = this.htmlelement.querySelector('#packetBox');
        if (box.firstChild) {
            box.replaceChild(packet.show(), box.firstChild);
        } else {
            box.appendChild(packet.show());
        }
    }

    // Event listener function
    blockPlacedListener(event) {
        console.log(event.detail);
        console.log(this.id);
        // Check if the event is for this station
        if (event.detail === this.id) {

            this.generatePacket();
        }
    }

    // Method to trigger blockPlaced event
    triggerBlockPlaced() {
        // Emit the event with the station's ID
        this.htmlelement.dispatchEvent(new CustomEvent('blockPlaced', { detail: this.id }));
    }
}

export default Station;
