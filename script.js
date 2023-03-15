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
  console.log("entra");
  e.preventDefault();
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) {
    alert("This book is already added");
  }

  library.addBook(newBook);
  saveLocal();

  //reset input values
  title.value="";
  author.value="";
  pages.value="";
  isRead.value="";
  
  //updateBooksGrid()

  closeModal();
}

function saveLocal() {
  localStorage.setItem("library", JSON.stringify(library.books));
}
