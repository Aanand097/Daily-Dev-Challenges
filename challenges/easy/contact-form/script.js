// Get references to form elements and feedback nodes
const contactForm = document.getElementById('contactForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const nameFeedback = document.getElementById('nameFeedback');
const emailFeedback = document.getElementById('emailFeedback');
const phoneFeedback = document.getElementById('phoneFeedback');
const messageFeedback = document.getElementById('messageFeedback');
const formSuccess = document.getElementById('formSuccess');

// Validation functions for each input field
function validateName(value) {
  const trimmedValue = value.trim();
  const namePattern = /^[A-Za-z ]+$/;
  if (trimmedValue.length < 3) {
    return 'Name must be at least 3 letters.';
  }
  if (!namePattern.test(trimmedValue)) {
    return 'Name can only contain letters and spaces.';
  }
  return '';
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value.trim())) {
    return 'Please enter a valid email address.';
  }
  return '';
}

function validatePhone(value) {
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length !== 10) {
    return 'Phone number must be exactly 10 digits.';
  }
  return '';
}

function validateMessage(value) {
  if (value.trim().length < 10) {
    return 'Message must contain at least 10 characters.';
  }
  return '';
}

// Update field state and feedback based on validation result
function updateFieldState(inputElement, feedbackElement, errorMessage) {
  if (errorMessage) {
    inputElement.classList.remove('input-success');
    inputElement.classList.add('input-error');
    feedbackElement.textContent = errorMessage;
  } else {
    inputElement.classList.remove('input-error');
    inputElement.classList.add('input-success');
    feedbackElement.textContent = '';
  }
}

// Run validation for every input on input event
function handleRealtimeValidation() {
  updateFieldState(fullNameInput, nameFeedback, validateName(fullNameInput.value));
  updateFieldState(emailInput, emailFeedback, validateEmail(emailInput.value));
  updateFieldState(phoneInput, phoneFeedback, validatePhone(phoneInput.value));
  updateFieldState(messageInput, messageFeedback, validateMessage(messageInput.value));
}

// Validate all fields and return whether the form is valid
function validateForm() {
  const nameError = validateName(fullNameInput.value);
  const emailError = validateEmail(emailInput.value);
  const phoneError = validatePhone(phoneInput.value);
  const messageError = validateMessage(messageInput.value);

  updateFieldState(fullNameInput, nameFeedback, nameError);
  updateFieldState(emailInput, emailFeedback, emailError);
  updateFieldState(phoneInput, phoneFeedback, phoneError);
  updateFieldState(messageInput, messageFeedback, messageError);

  return !nameError && !emailError && !phoneError && !messageError;
}

// Attach input listeners for instant validation feedback
fullNameInput.addEventListener('input', () => {
  updateFieldState(fullNameInput, nameFeedback, validateName(fullNameInput.value));
});

emailInput.addEventListener('input', () => {
  updateFieldState(emailInput, emailFeedback, validateEmail(emailInput.value));
});

phoneInput.addEventListener('input', () => {
  updateFieldState(phoneInput, phoneFeedback, validatePhone(phoneInput.value));
});

messageInput.addEventListener('input', () => {
  updateFieldState(messageInput, messageFeedback, validateMessage(messageInput.value));
});

// Handle form submission and final validation
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSuccess.textContent = '';

  if (validateForm()) {
    formSuccess.textContent = 'Form submitted successfully';
    contactForm.reset();
    [fullNameInput, emailInput, phoneInput, messageInput].forEach((input) => {
      input.classList.remove('input-success');
    });
  } else {
    formSuccess.textContent = '';
  }
});
