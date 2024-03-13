document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("semiTruck-Form");
    let currentIndex = 0; // Keep track of the current input index

    // Array of input fields configuration
    const inputsConfig = [
        { id: "semi-Type", type: "text", placeholder: "Enter type of semi truck", label: "Type", validation: value => value.trim() !== "", errorMsg: "Type is required" },
        { id: "semi-Length", type: "number", placeholder: "Enter Length of semi truck", label: "Length", validation: value => !isNaN(value) && parseInt(value, 10) > 0, errorMsg: "Length must be a positive number" },
        { id: "semi-Weight", type: "number", placeholder: "Enter weight of semi truck", label: "Weight", validation: value => !isNaN(value) && parseInt(value, 10) > 0, errorMsg: "Weight must be a positive number" }
    ];


    // Create input fields but hide them initially
    inputsConfig.forEach((input, index) => {
        const field = addFormInput(form, input.label, input.type, input.id, input.placeholder, input.requiredMsg);
        field.style.display = index === 0 ? "block" : "none"; // Only show the first input initially
    });

    // Button logic
    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");
    const submitButton = form.querySelector('input[type="submit"]');

    prevButton.style.visibility = "hidden"; // Hide prev button initially

    prevButton.addEventListener("click", function () {
        toggleInput(-1);
    });

    nextButton.addEventListener("click", function () {
        toggleInput(1);
    });

    function toggleInput(direction) {

        if (direction > 0 && !validateInput(currentIndex)) {
            return; // Stop the function if the current input is invalid
        }
        const totalInputs = inputsConfig.length;
        const currentInput = form.getElementsByClassName("form-group")[currentIndex];
        let newIndex = currentIndex + direction;

        // Boundary checks
        if (newIndex >= 0 && newIndex < totalInputs) {
            currentInput.style.display = "none"; // Hide current input
            const nextInput = form.getElementsByClassName("form-group")[newIndex];
            nextInput.style.display = "block"; // Show next input
            currentIndex = newIndex; // Update current index

            // Update button visibility
            prevButton.style.visibility = currentIndex > 0 ? "visible" : "hidden";
            nextButton.style.visibility = currentIndex < totalInputs - 1 ? "visible" : "hidden";
            submitButton.style.visibility = currentIndex === totalInputs - 1 ? "visible" : "hidden";
        }
    }

    // Utility function to create input groups
    function addFormInput(form, context, type, id, placeholder, errorData) {
        let group = document.createElement("div");
        group.className = "form-group";

        let label = document.createElement("label");
        label.textContent = context + ": ";
        label.setAttribute("for", id);

        let input = document.createElement("input");
        input.type = type === "int" ? "number" : type; // Use 'number' for int types
        input.id = id;
        input.placeholder = placeholder;

        let error = document.createElement("span");
        error.textContent = errorData;
        error.style.visibility = "hidden";

        group.appendChild(label);
        group.appendChild(document.createElement("br"));
        group.appendChild(input);
        group.appendChild(document.createElement("br"));
        group.appendChild(error);
        group.appendChild(document.createElement("br"));
        form.appendChild(group);

        return group;
    }

    function validateInput(inputIndex) {
        const inputConfig = inputsConfig[inputIndex];
        const inputElement = document.getElementById(inputConfig.id);
        const errorElement = inputElement.nextElementSibling.nextElementSibling; // Assuming the error <span> is right after the <input>

        if (!inputConfig.validation(inputElement.value)) {
            errorElement.textContent = inputConfig.errorMsg;
            errorElement.style.visibility = "visible";
            return false;
        } else {
            errorElement.style.visibility = "hidden";
            return true;
        }
    }

});