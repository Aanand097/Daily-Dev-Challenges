const input = document.getElementById('search-input');
const output = document.getElementById('output');

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function handleInputChange(event) {
  const value = event.target.value.trim();
  output.textContent = value ? `Result: ${value}` : 'Waiting for input...';
}

input.addEventListener('input', debounce(handleInputChange, 600));
