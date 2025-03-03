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
  addBookToDisplayCard(myLibrary[myLibrary.length - 1]);
  checkBookEmpty();
  showToast(`New book '${title}' added`);
}

function removeBookFromLibrary(bookId) {
  const bookCardContainer = document.getElementById(bookId);
  bookCardContainer.parentNode.removeChild(bookCardContainer);
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  checkBookEmpty();
  showToast("Book removed");
}

function createElement(elementType, elementIdAndClassName) {
  const newElement = document.createElement(elementType);
  newElement.setAttribute("id", elementIdAndClassName);
  newElement.setAttribute("class", elementIdAndClassName);
  return newElement;
}

function checkBookEmpty() {
  const bookGridContainer = document.getElementById("book-display-body");
  const bookEmptyContainer = document.getElementById("book-empty-body");
  if (myLibrary.length === 0) {
    bookEmptyContainer.style.display = "flex";
    bookGridContainer.style.display = "none";
  } else {
    bookEmptyContainer.style.display = "none";
    bookGridContainer.style.display = "grid";
  }
}

function showToast(text) {
  const toastContainer = document.getElementById("toast");
  const toastText = document.getElementById("toast-message");
  toastContainer.style.display = "block";
  toastText.textContent = text;
  setTimeout(() => {
    toastContainer.style.display = "none";
  }, 2000);
}

function addBookToDisplayCard(bookData) {
  const bookGridContainer = document.getElementById("book-display-body");
  const bookCardContainer = document.createElement("div");
  const bookTitle = createElement("p", "book-title");
  const bookAuthor = createElement("p", "book-author");
  const bookPages = createElement("p", "book-pages");
  const bookCardButtonContainer = createElement("div", "book-button-container");
  const bookIsReadButton = createElement("button", "book-is-read");
  const bookRemoveButton = createElement("button", "book-remove");
  const bookIsReadIcon = document.createElement("img");
  const bookRemoveIcon = document.createElement("img");

  bookCardContainer.setAttribute("id", bookData.id);
  const srcImgRead = "./src/assets/icons/book-check-outline.svg";
  const srcImgUnread = "./src/assets/icons/book-outline.svg";
  bookIsReadIcon.setAttribute("src", bookData.isRead ? srcImgRead : srcImgUnread);
  bookRemoveIcon.setAttribute("src", "./src/assets/icons/book-remove.svg");
  bookIsReadButton.setAttribute("title", "Toggle this book read status");
  bookRemoveButton.setAttribute("title", "Remove this book");
  bookRemoveButton.addEventListener("click", () => {
    bookIdToBeDeleted = bookData.id; // Store the clicked book ID
    const textDialog = document.getElementById("dialog-text");
    textDialog.textContent = "Are you sure you want to remove this book?";
    const confirmDialog = document.getElementById("confirm-dialog");
    confirmDialog.showModal(); // Show confirm dialog
  });
  bookIsReadButton.addEventListener("click", () => {
    bookData.toggleIsRead();
    bookIsReadIcon.setAttribute("src", bookData.isRead ? srcImgRead : srcImgUnread);
    showToast(bookData.isRead ? `Book '${bookData.title}' read` : `Book '${bookData.title}' not read`);
    console.log(`Book ID ${bookData.id} is read? '${bookData.isRead ? "Yes" : "No"}'`);
  });

  bookTitle.textContent = bookData.title;
  bookAuthor.textContent = bookData.author;
  bookPages.textContent = `${bookData.pages} pages`;
  bookIsReadButton.appendChild(bookIsReadIcon);
  bookRemoveButton.appendChild(bookRemoveIcon);

  // Append the display elements to individual card container
  bookCardContainer.appendChild(bookTitle);
  bookCardContainer.appendChild(bookAuthor);
  bookCardContainer.appendChild(bookPages);
  bookCardButtonContainer.appendChild(bookIsReadButton);
  bookCardButtonContainer.appendChild(bookRemoveButton);
  bookCardContainer.appendChild(bookCardButtonContainer);
  // Then to the main card container
  bookGridContainer.appendChild(bookCardContainer);
}

// On DOM mounted
document.addEventListener("DOMContentLoaded", function() {
  const showAddBookDialogButton = document.getElementById("button-add-book-dialog-show");
  const confirmDialogButton = document.getElementById("button-dialog-confirm");
  const cancelDialogButton = document.getElementById("button-dialog-cancel");
  const cancelAddBookDialogButton = document.getElementById("button-add-book-cancel");
  const addBookForm = document.getElementById("add-book-form");
  const addBookDialog = document.getElementById("add-book-dialog");
  const confirmDialog = document.getElementById("confirm-dialog");
  showAddBookDialogButton.addEventListener("click", () => {
    addBookDialog.showModal(); // Show add book dialog
  });
  cancelAddBookDialogButton.addEventListener("click", () => {
    addBookDialog.close(); // Close add book dialog
    addBookForm.reset();
  });
  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary(
      addBookForm["add-book-form-title"].value,
      addBookForm["add-book-form-author"].value,
      addBookForm["add-book-form-pages"].value,
      addBookForm["add-book-form-read"].checked
    );
    addBookDialog.close(); // Close add book dialog
    addBookForm.reset();
  });
  confirmDialogButton.addEventListener("click", () => {
    removeBookFromLibrary(bookIdToBeDeleted);
    confirmDialog.close(); // Close confirm dialog
  });
  cancelDialogButton.addEventListener("click", () => {
    confirmDialog.close(); // Close confirm dialog
  });
  checkBookEmpty();
})
