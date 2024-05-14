document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const form = document.getElementById('truckForm');
    let currentStep = 0;

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                steps[currentStep].classList.remove('form-step-active');
                currentStep++;
                steps[currentStep].classList.add('form-step-active');
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            steps[currentStep].classList.remove('form-step-active');
            currentStep--;
            steps[currentStep].classList.add('form-step-active');
        });
    });

    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault();
        }
    });

    function validateStep(step) {
        const length = parseInt(document.getElementById('length').value, 10);
        const width = parseInt(document.getElementById('width').value, 10);
        clearErrors();

        if (step === 0 && (isNaN(length) || length > 10)) {
            showError('length', 'Lengte mag maximaal 10 zijn.');
            return false;
        } else if (step === 1 && (isNaN(width) || width > 10)) {
            showError('width', 'Breedte mag maximaal 10 zijn.');
            return false;
        }
        return true;
    }

    function validateForm() {
        const length = parseInt(document.getElementById('length').value, 10);
        const width = parseInt(document.getElementById('width').value, 10);
        clearErrors();

        if (isNaN(length) || length > 10) {
            showError('length', 'Lengte mag maximaal 10 zijn.');
            return false;
        }
        if (isNaN(width) || width > 10) {
            showError('width', 'Breedte mag maximaal 10 zijn.');
            return false;
        }
        return true;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.id = `${fieldId}-error`;
            errorDiv.className = 'error-message';
            document.getElementById(fieldId).parentNode.appendChild(errorDiv);
            errorDiv.textContent = message;
        } else {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.textContent = '');
    }
});
