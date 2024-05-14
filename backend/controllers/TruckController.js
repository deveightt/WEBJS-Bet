import Truck from '../models/Truck.js';

class TruckController {
  constructor() {
    this.trucks = [];
    this.trucksContainer = document.getElementById('truckContainer') || document.createElement('div');
    this.trucksContainer.id = 'truckContainer';
    document.body.appendChild(this.trucksContainer);
    this.attachFormSubmitEvent();
  }

  attachFormSubmitEvent() {
    const form = document.getElementById('truckForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const truckLength = parseInt(document.getElementById('length').value, 10);
      const truckWidth = parseInt(document.getElementById('width').value, 10);
      const minAllowedLength = parseInt(document.getElementById('length').min);
      const minAllowedWidth = parseInt(document.getElementById('width').min);
      const maxAllowedLength = parseInt(document.getElementById('length').max);
      const maxAllowedWidth = parseInt(document.getElementById('width').max);
      const truckType = document.getElementById('type').value;

      if (isLengthValid(truckLength, minAllowedLength, maxAllowedLength) &&
        isWidthValid(truckWidth, minAllowedWidth, maxAllowedWidth)) {
        this.addTruck(new Truck(truckLength, truckWidth, truckType));
      } else {
        if (!isLengthValid(truckLength, minAllowedLength, maxAllowedLength)) {
          alert(`Length should be between ${minAllowedLength} and ${maxAllowedLength}.`);
        }
        if (!isWidthValid(truckWidth, minAllowedWidth, maxAllowedWidth)) {
          alert(`Width should be between ${minAllowedWidth} and ${maxAllowedWidth}.`);
        }
      }
    });

    function isLengthValid(length, minLength, maxLength) {
      return length >= minLength && length <= maxLength;
    }

    function isWidthValid(width, minWidth, maxWidth) {
      return width >= minWidth && width <= maxWidth;
    }
  }



  addTruck(truck) {
    const interval = parseInt(document.getElementById('interval').value, 10);
    console.log(`Interval: ${interval}`); // Debug: Log interval value

    setTimeout(() => {
      this.trucks.push(truck);
      this.renderTruck(truck);
    }, interval * 1000);
  }

  renderTruck(truck) {
    const truckElement = truck.createTruckElement();
    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.addEventListener('click', () => this.sendTruck(truck, truckElement));
    truckElement.appendChild(sendButton);
    this.trucksContainer.appendChild(truckElement);
  }

  sendTruck(truck, truckElement) {
    truckElement.classList.add('depart');

    setTimeout(() => {
      this.trucks = this.trucks.filter(t => t !== truck);
      truckElement.remove();
    }, 2000);
  }
}

export default TruckController;