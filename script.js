// Data Structures

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

let button_add = document.getElementById("button-add");
let modal_box = document.getElementsByClassName("modal-box");
let overlay = document.getElementsByClassName("overlay");
let close_btn = document.getElementById("close-modal-btn");
let modal_form = document.getElementById("form");
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let isRead = document.getElementById("checkbox1");
let container_cards = document.getElementById("card-container");

button_add.onclick = openBookModal;
close_btn.onclick = closeModal;

function openBookModal() {
  overlay[0].classList.add("actived");
  modal_box[0].classList.add("actived");
}

function closeModal() {
  overlay[0].classList.remove("actived");
  modal_box[0].classList.remove("actived");
}

const getBookFromInput = () => {
  return new Book(title.value, author.value, pages.value, isRead.checked);
};

function addNewBook(e) {
  e.preventDefault();
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) {
    alert("This book is already added");
  }

  library.addBook(newBook);
  saveLocal();

  //reset input values
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.value = "";

  updateBooksGrid();

  closeModal();
}

function saveLocal() {
  localStorage.setItem("library", JSON.stringify(library.books));
}

function deleteLocal(item) {
  localStorage.removeItem(item);
}

function updateBooksGrid() {
  //reset
  container_cards.innerHTML = "";

  for (let book of library.books) {
    createBookCard(book);
  }
}

function createBookCard(book) {
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("h4");
  const pages = document.createElement("h4");
  const button_delete = document.createElement("input");

  card.classList.add("book-card");
  button_delete.type = "button";
  button_delete.value = "REMOVE";

  if (book.isRead) {
    card.classList.add("read");
  }

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(button_delete);
  container_cards.appendChild(card);

  button_delete.addEventListener("click", () => {
    container_cards.removeChild(card);
    library.removeBook(title.innerHTML);
    console.log(title.innerHTML);
  });
}
