let myLibrary = [];

function Book(
  id,
  title,
  author,
  pages,
  isRead
) {
  // The book constructor
  this.id = id
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary(
  title,
  author,
  pages,
  isRead
) {
  // Create a book then store it to the "myLibrary" array
  const id = `book-${Date.now()}`;
  const newBook = new Book(id, title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBookCards(myLibrary[myLibrary.length - 1]);
}

function displayBookCards(bookData) {
  const newBookCardContainer = document.getElementById("book-cards-container");
  const newBookTitleElement = document.createElement("p");
  const newBookAuthorElement = document.createElement("p");
  const newBookPagesElement = document.createElement("p");
  const newBookIsReadElement = document.createElement("p");

  newBookTitleElement.setAttribute("id", "book-title");
  newBookTitleElement.setAttribute("class", "book-title");
  newBookAuthorElement.setAttribute("id", "book-author");
  newBookAuthorElement.setAttribute("class", "book-author");
  newBookPagesElement.setAttribute("id", "book-pages");
  newBookPagesElement.setAttribute("class", "book-pages");
  newBookIsReadElement.setAttribute("id", "book-is-read");
  newBookIsReadElement.setAttribute("class", "book-is-read");

  newBookTitleElement.textContent = bookData.title;
  newBookAuthorElement.textContent = bookData.author;
  newBookPagesElement.textContent = bookData.pages;
  newBookIsReadElement.textContent = bookData.isRead;

  newBookCardContainer.appendChild(newBookTitleElement);
  newBookCardContainer.appendChild(newBookAuthorElement);
  newBookCardContainer.appendChild(newBookPagesElement);
  newBookCardContainer.appendChild(newBookIsReadElement);
}



// On DOM mounted
document.addEventListener("DOMContentLoaded", function() {
  const buttonShowModalAddBookComponent = document.getElementById("button-show-modal-add-book");
  const buttonCancelAddBookComponent = document.getElementById("modal-button-cancel-add-book");
  const formAddBookComponent = document.getElementById("modal-form-add-book");
  const modalOverlayContainerComponent = document.getElementById("modal-overlay-container");
  const modalAddBookContainerComponent = document.getElementById("modal-container-add-book");
  buttonShowModalAddBookComponent.addEventListener("click", () => {
    modalOverlayContainerComponent.style.display = "flex"; // Show modal overlay
    modalAddBookContainerComponent.style.display = "flex"; // Show add book modal
  });
  buttonCancelAddBookComponent.addEventListener("click", () => {
    modalOverlayContainerComponent.style.display = "none"; // Close modal overlay
    modalAddBookContainerComponent.style.display = "none"; // Close add book modal
    formAddBookComponent.reset();
  });
  formAddBookComponent.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary(
      formAddBookComponent["modal-form-add-book-title"].value,
      formAddBookComponent["modal-form-add-book-author"].value,
      formAddBookComponent["modal-form-add-book-pages"].value,
      formAddBookComponent["modal-form-add-book-read"].checked
    )
    modalOverlayContainerComponent.style.display = "none"; // Close modal overlay
    modalAddBookContainerComponent.style.display = "none"; // Close add book modal
    formAddBookComponent.reset();
  });
})
