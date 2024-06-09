import Truck from '../models/Truck.js';

class TruckController {
  constructor(container, weatherController) {
    this.trucks = [];
    this.container = container;
    this.weatherController = weatherController;
    this.trucksContainer = this.container.querySelector('.truckContainer') || document.createElement('div');
    this.trucksContainer.classList.add('truckContainer');
    this.container.appendChild(this.trucksContainer);
    this.attachFormSubmitEvent();
  }

  attachFormSubmitEvent() {
    const form = this.container.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const truckLength = parseInt(this.container.querySelector('.length').value, 10);
      const truckWidth = parseInt(this.container.querySelector('.width').value, 10);
      const minAllowedLength = parseInt(this.container.querySelector('.length').min);
      const minAllowedWidth = parseInt(this.container.querySelector('.width').min);
      const maxAllowedLength = parseInt(this.container.querySelector('.length').max);
      const maxAllowedWidth = parseInt(this.container.querySelector('.width').max);
      const truckType = this.container.querySelector('.type').value;

      if (isLengthValid(truckLength, minAllowedLength, maxAllowedLength) &&
        isWidthValid(truckWidth, minAllowedWidth, maxAllowedWidth)) {
        await this.addTruck(new Truck(truckLength, truckWidth, truckType, this.container));
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

  async addTruck(truck) {
    if (this.trucks.length >= 10) {
      this.container.querySelector('#truck-create-message').innerText = 'Je kan niet meer dan 10 vrachtwagens maken!';
      this.container.querySelector('#truck-submit-form').disabled = true;
      return;
    }

    // Disable the submit button to prevent further submissions
    this.container.querySelector('#truck-submit-form').disabled = true;

    const interval = parseInt(this.container.querySelector('.interval').value, 10);

    await new Promise(resolve => setTimeout(resolve, interval * 1000));
    this.trucks.push(truck);
    this.renderTruck(truck);

    // Re-enable the submit button if the truck limit is not yet reached
    if (this.trucks.length < 10) {
      this.container.querySelector('#truck-submit-form').disabled = false;
    }
  }

  renderTruck(truck) {
    const truckElement = truck.createTruckElement();
    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.addEventListener('click', async () => {
      if (this.weatherController.canSendTruck(truck.type)) {
        await this.sendTruck(truck, truckElement);
        this.container.querySelector('#truck-create-message').innerText = '';
        this.container.querySelector('#truck-submit-form').disabled = false;
      } else {
        // Animate the button red and show a message
        sendButton.classList.add('error');
        sendButton.innerText = `Kan niet vesturen door weer.`;
        setTimeout(() => {
          sendButton.classList.remove('error');
          sendButton.innerText = 'Send';
        }, 3000); // Reset after 3 seconds
      }
    });
    truckElement.appendChild(sendButton);
    this.trucksContainer.appendChild(truckElement);
  }


  async sendTruck(truck, truckElement) {
    truckElement.classList.add('depart');

    await new Promise(resolve => setTimeout(resolve, 2000));
    this.trucks = this.trucks.filter(t => t !== truck);
    truckElement.remove();

    // Re-enable the submit button once a truck is removed
    if (this.trucks.length < 10) {
      this.container.querySelector('#truck-submit-form').disabled = false;
      this.container.querySelector('#truck-create-message').innerText = '';
    }
  }
}

export default TruckController;
