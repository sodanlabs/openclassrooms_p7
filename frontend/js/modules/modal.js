let modal = null;
const focusableSelector = 'button, textarea, input';
let elementsFocusable = [];
let elementPreviouslyFocused = null;

function openModal(event) {
    event.preventDefault();
    modal = document.querySelector(event.target.getAttribute('href'));
    elementsFocusable = Array.from(modal.querySelectorAll(focusableSelector));
    elementPreviouslyFocused = document.querySelector(':focus');
    modal.classList.toggle('invisible');
    elementsFocusable[1].focus();
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', (event) => {
        closeModal(event);
    });
    modal.querySelector('.js-modal-close').addEventListener('click', (event) => {
        closeModal(event);
    });
    modal.querySelector('.js-modal-stop').addEventListener('click', (event) => {
        stopBublePropagation(event);
    });
}

function closeModal(event) {
    if (modal === null) { return }
    if (elementPreviouslyFocused !== null) {
        elementPreviouslyFocused.focus();
    }
    event.preventDefault();
    modal.classList.toggle('invisible');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', (event) => {
        closeModal(event);
    });
    modal.querySelector('.js-modal-close').removeEventListener('click', (event) => {
        closeModal(event);
    });
    modal.querySelector('.js-modal-stop').removeEventListener('click', (event) => {
        stopBublePropagation(event);
    });
    modal = null;
}

function stopBublePropagation(event) {
    event.stopPropagation();
}

 function focusInModal(event) {
    event.preventDefault();
    let index = elementsFocusable.findIndex(focus => focus === modal.querySelector(':focus'));
    if (event.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= elementsFocusable.length) {
        index = 0;
    }
    if (index < 0) {
        index = elementsFocusable.length - 1;
    }
    elementsFocusable[index].focus();
}




window.addEventListener('keydown', (event) => {
    
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
    if (event.key === 'Tab' && modal !== null) {
        focusInModal(event);
    }
}); 