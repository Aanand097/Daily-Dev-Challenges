const form = document.getElementById('shortener-form');
const input = document.getElementById('url-input');
const result = document.getElementById('result');
const shortLink = document.getElementById('short-link');
const error = document.getElementById('error');

function createShortCode() {
  return Math.random().toString(36).slice(2, 8);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const url = input.value.trim();
  if (!url || !isValidUrl(url)) {
    result.classList.add('hidden');
    error.textContent = 'Please enter a valid URL including http:// or https://';
    return;
  }
  error.textContent = '';
  const shortUrl = `https://short.ly/${createShortCode()}`;
  shortLink.textContent = shortUrl;
  shortLink.href = url;
  result.classList.remove('hidden');
});
