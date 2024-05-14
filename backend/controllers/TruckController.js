class TruckManager {
  constructor() {
    this.trucks = [];
    this.trucksContainer = document.getElementById('truckContainer') || document.createElement('div');
    this.trucksContainer.id = 'truckContainer';
    document.body.appendChild(this.trucksContainer);
    this.attachFormSubmitEvent();
  }

  attachFormSubmitEvent() {
    document.getElementById('truckForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const length = parseInt(document.getElementById('length').value, 10);
      const width = parseInt(document.getElementById('width').value, 10);
      const type = document.getElementById('type').value;

      if (length <= 10 && width <= 10) {
        this.addTruck(new Truck(length, width, type));
      } else {
        alert('Lengte en breedte mogen maximaal 10 zijn.');
      }
    });
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
    sendButton.innerText = 'Verstuur';
    sendButton.addEventListener('click', () => this.sendTruck(truck, truckElement));
    truckElement.appendChild(sendButton);
    this.trucksContainer.appendChild(truckElement);
  }

  sendTruck(truck, truckElement){
    truckElement.style.animation = 'slideOutToBottom 2s ease-out';
    setTimeout(() => {
      this.trucks = this.trucks.filter(t => t !== truck);
      truckElement.remove();
    }, 2000);
  }
}
