const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const cancelModal = document.getElementById('cancelModal');
const modalBackdrop = document.getElementById('modalBackdrop');

function toggleModal(open) {
  modalBackdrop.classList.toggle('open', open);
  modalBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (open) {
    closeModal.focus();
  }
}

openModal.addEventListener('click', () => toggleModal(true));
closeModal.addEventListener('click', () => toggleModal(false));
cancelModal.addEventListener('click', () => toggleModal(false));

modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) {
    toggleModal(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalBackdrop.classList.contains('open')) {
    toggleModal(false);
  }
});
