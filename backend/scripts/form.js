// backend/models/form.js
export function initializeForm() {
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const form = document.getElementById('truckForm');
    const minLength = parseInt(document.getElementById('length').min);
    const minWidth = parseInt(document.getElementById('width').min);
    const maxLength = parseInt(document.getElementById('length').max);
    const maxWidth = parseInt(document.getElementById('width').max);
    let currentStep = 0;

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep, minLength, maxLength, minWidth, maxWidth)) {
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
        if (!validateForm(minLength, maxLength, minWidth, maxWidth)) {
            e.preventDefault();
        }
    });

    function validateStep(step, minLength, maxLength, minWidth, maxWidth) {
        const length = parseInt(document.getElementById('length').value, 10);
        const width = parseInt(document.getElementById('width').value, 10);
        clearErrors();

        if (step === 0 && (isNaN(length) || length > maxLength || length < minLength)) {
            showError('length', `Length should be between ${minLength} and ${maxLength}.`);
            return false;
        } else if (step === 1 && (isNaN(width) || width > maxWidth || width < minWidth)) {
            showError('width', `Width should be between ${minWidth} and ${maxWidth}.`);
            return false;
        }
        return true;
    }

    function validateForm(minLength, maxLength, minWidth, maxWidth) {
        const length = parseInt(document.getElementById('length').value, 10);
        const width = parseInt(document.getElementById('width').value, 10);
        clearErrors();

        if (isNaN(length) || length > maxLength || length < minLength) {
            showError('length', `Length should be between ${minLength} and ${maxLength}.`);
            return false;
        }
        if (isNaN(width) || width > maxWidth || width < minWidth) {
            showError('width', `Width should be between ${minWidth} and ${maxWidth}.`);
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
}
