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
      this.trucks.push(truck);
      this.renderTrucks();
    }
  
    renderTrucks() {
      this.trucksContainer.innerHTML = '';
      this.trucks.forEach(truck => {
        this.trucksContainer.appendChild(truck.createTruckElement());
      });
    }
  }
  