const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookPages = document.getElementById('bookPages');
const bookStatus = document.getElementById('bookStatus');
const addButton = document.getElementById('addButton');
const bookList = document.getElementById('bookList');
const filterOption = document.getElementById('filterOption');

let myLibrary = [];

addButton.addEventListener('click', addBookToLibrary);
bookList.addEventListener('click', deleteBook);
filterOption.addEventListener('click', filterBook);

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status
}

function addBookToLibrary() {
  event.preventDefault();

  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPages.value;
  let status = bookStatus.value;
  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  displayLibrary(myLibrary);
}

function displayLibrary(library) {
  bookList.innerHTML = ''; // clear the bookList

  for (let i = 0; i < library.length; i++) {
    let bookDetails = document.createElement('tr');
    let title = document.createElement('td');
    let author = document.createElement('td');
    let pages = document.createElement('td');

    let status = document.createElement('td');
    let statusButton = statusState(library[i].status);

    let deleteData = document.createElement('td');
    let deleteButton = document.createElement('button');

    title.innerText = library[i].title;
    author.innerText = library[i].author;
    pages.innerText = library[i].pages;
    deleteButton.innerText = 'Delete';

    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-outline-danger');

    bookList.appendChild(bookDetails);
    bookDetails.appendChild(title);
    bookDetails.appendChild(author);
    bookDetails.appendChild(pages); 
    bookDetails.appendChild(status);
    bookDetails.appendChild(deleteData); 
    
    status.appendChild(statusButton);
    deleteData.appendChild(deleteButton);
  }
  clearForm();
}

function deleteBook(e) {
  let item = e.target;

  if (item.classList.contains('btn-outline-danger')) {
    let bookRow = item.parentElement.parentElement;
    
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === bookRow.children[0].innerText) {
        myLibrary.splice(i, 1);
        bookRow.remove();
      }
    }
   
  }

}

function clearForm() {
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
  bookStatus.value = 'Unread';
  filterOption.value = 'All';
}

function statusState(status) {
  // Initalizing default state of status button based on `bookStatus` value
  let statusButton = document.createElement('btn');
  statusButton.innerText = status;
  statusButton.classList.add('btn');

  const statusClasses = {
    Unread: 'btn-secondary',
    Reading: 'btn-warning',
    Finished: 'btn-success'
  };

  statusButton.classList.add(statusClasses[status]);
  
  // Change Status on click
  statusButton.addEventListener('click', () => {
    if (status === 'Unread') {
      status = 'Reading';
    } else if (status === 'Reading') {
      status = 'Finished';
    } else if (status === 'Finished') {
      status = 'Unread';
    }
    statusButton.innerText = status;
    statusButton.classList.remove('btn-secondary', 'btn-warning', 'btn-success');
    statusButton.classList.add(statusClasses[status]);
  });

  return statusButton;
}

function filterBook(e) {
  let books = bookList.childNodes;

  books.forEach(book => {
    switch (e.target.value) {
      case 'All':
        book.style.display = 'table-row';
        break;
      case 'Unread':
        if (book.childNodes[3].children[0].classList.contains('btn-secondary')) {
          book.style.display = 'table-row';
        } else {
          book.style.display = 'none';
        }
        break;
      case 'Reading':
        if (book.childNodes[3].children[0].classList.contains('btn-warning')) {
          book.style.display = 'table-row';
        } else {
          book.style.display = 'none';
        }
        break;
      case 'Finished':
        if (book.childNodes[3].children[0].classList.contains('btn-success')) {
          book.style.display = 'table-row';
        } else {
          book.style.display = 'none';
        }
        break;
    }
  });
}