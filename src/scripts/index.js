const myLibrary = [];

function Book() {
  // The book constructor
}

function addBookToLibrary() {
  // Create a book then store it to the "myLibrary" array
}

// On DOM mounted
document.addEventListener("DOMContentLoaded", function() {
  const buttonShowModalAddBookComponent = document.getElementById("button-show-modal-add-book");
  const buttonCancelAddBookComponent = document.getElementById("button-cancel-add-book");
  const modalOverlayContainerComponent = document.getElementById("modal-overlay-container");
  const modalAddBookContainerComponent = document.getElementById("modal-container-add-book");
  buttonShowModalAddBookComponent.addEventListener("click", () => {
    modalOverlayContainerComponent.style.display = "flex"; // Show modal overlay
    modalAddBookContainerComponent.style.display = "flex"; // Show add book modal
  });
  buttonCancelAddBookComponent.addEventListener("click", () => {
    modalOverlayContainerComponent.style.display = "none"; // Close modal overlay
    modalAddBookContainerComponent.style.display = "none"; // Close add book modal
  });
})
