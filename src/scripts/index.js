let bookIdToBeDeleted = "";
let myLibrary = [];

function Book(
  id,
  title,
  author,
  pages,
  isRead
) {
  // The book constructor
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleIsRead = function() {
  this.isRead = !this.isRead;
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

function removeBookFromLibrary(bookId) {
  const newBookCardIndividualContainer = document.getElementById(bookId);
  newBookCardIndividualContainer.parentNode.removeChild(newBookCardIndividualContainer);
  myLibrary = myLibrary.filter(book => book.id !== bookId);
}

function displayBookCards(bookData) {
  const newBookCardMainContainer = document.getElementById("book-cards-container");
  const newBookCardIndividualContainer = document.createElement("div");
  const newBookTitleElement = document.createElement("p");
  const newBookAuthorElement = document.createElement("p");
  const newBookPagesElement = document.createElement("p");
  const newBookIsReadElement = document.createElement("input");
  const newBookRemoveButton = document.createElement("button");

  newBookCardIndividualContainer.setAttribute("id", bookData.id);
  newBookTitleElement.setAttribute("id", "book-title");
  newBookTitleElement.setAttribute("class", "book-title");
  newBookAuthorElement.setAttribute("id", "book-author");
  newBookAuthorElement.setAttribute("class", "book-author");
  newBookPagesElement.setAttribute("id", "book-pages");
  newBookPagesElement.setAttribute("class", "book-pages");
  newBookIsReadElement.setAttribute("id", "book-is-read");
  newBookIsReadElement.setAttribute("class", "book-is-read");
  newBookIsReadElement.setAttribute("type", "checkbox");
  newBookRemoveButton.addEventListener("click", () => {
    bookIdToBeDeleted = bookData.id; // Store the clicked book ID
    const modalDialogTextComponent = document.getElementById("dialog-text");
    modalDialogTextComponent.textContent = "Are you sure you want to remove this book?";
    const modalDialogContainerComponent = document.getElementById("confirm-dialog");
    modalDialogContainerComponent.showModal(); // Show dialog modal
  });
  newBookIsReadElement.addEventListener("change", () => {
    bookData.toggleIsRead();
    console.log(`Book ID ${bookData.id} is read? '${bookData.isRead ? "Yes" : "No"}'`);
  });

  newBookTitleElement.textContent = bookData.title;
  newBookAuthorElement.textContent = bookData.author;
  newBookPagesElement.textContent = `${bookData.pages} pages`;
  newBookIsReadElement.checked = bookData.isRead;
  newBookRemoveButton.textContent = "Delete Book";

  // Append the display elements to individual card container
  newBookCardIndividualContainer.appendChild(newBookTitleElement);
  newBookCardIndividualContainer.appendChild(newBookAuthorElement);
  newBookCardIndividualContainer.appendChild(newBookPagesElement);
  newBookCardIndividualContainer.appendChild(newBookIsReadElement);
  newBookCardIndividualContainer.appendChild(newBookRemoveButton);
  // Then to the main card container
  newBookCardMainContainer.appendChild(newBookCardIndividualContainer);
}

// On DOM mounted
document.addEventListener("DOMContentLoaded", function() {
  const buttonShowModalAddBookComponent = document.getElementById("button-add-book-dialog-show");
  const buttonConfirmDialogComponent = document.getElementById("button-dialog-confirm");
  const buttonCancelAddBookComponent = document.getElementById("button-add-book-cancel");
  const buttonCancelDialogComponent = document.getElementById("button-dialog-cancel");
  const formAddBookComponent = document.getElementById("add-book-form");
  const modalAddBookContainerComponent = document.getElementById("add-book-dialog");
  const modalDialogContainerComponent = document.getElementById("confirm-dialog");
  buttonShowModalAddBookComponent.addEventListener("click", () => {
    modalAddBookContainerComponent.showModal(); // Show add book dialog
  });
  buttonCancelAddBookComponent.addEventListener("click", () => {
    modalAddBookContainerComponent.close(); // Close add book dialog
    formAddBookComponent.reset();
  });
  formAddBookComponent.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary(
      formAddBookComponent["add-book-form-title"].value,
      formAddBookComponent["add-book-form-author"].value,
      formAddBookComponent["add-book-form-pages"].value,
      formAddBookComponent["add-book-form-read"].checked
    )
    modalAddBookContainerComponent.close(); // Close add book dialog
    formAddBookComponent.reset();
  });
  buttonConfirmDialogComponent.addEventListener("click", () => {
    removeBookFromLibrary(bookIdToBeDeleted);
    modalDialogContainerComponent.close(); // Close confirm dialog
  });
  buttonCancelDialogComponent.addEventListener("click", () => {
    modalDialogContainerComponent.close(); // Close confirm dialog
  });
})
