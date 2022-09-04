import { Bookshelf } from './Bookshelf';
import { Book } from './Book';

describe('Bookshelf', () => {
  const theLordOfTheRings: Book = {
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    date: new Date('1954-02-15'),
  };
  const theHobbit: Book = {
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    date: new Date('1937-09-21'),
  };
  const hamlet: Book = {
    title: 'Hamlet',
    author: 'William Shakespeare',
    date: new Date('1600'),
  };
  const candide: Book = {
    title: 'Candide',
    author: 'Voltaire',
    date: new Date('1759'),
  };
  const aLaRechercheDuTempsPerdu = {
    title: 'À la recherche du temps perdu',
    author: 'Marcel Proust',
    date: new Date('1927'),
  };

  let bookshelf: Bookshelf;

  beforeEach(() => {
    bookshelf = new Bookshelf();
  });

  it('should store a book', () => {
    bookshelf.addBook(aLaRechercheDuTempsPerdu);

    expect(bookshelf.getBook('À la recherche du temps perdu')).toEqual(
      aLaRechercheDuTempsPerdu,
    );
  });

  it('should return all books ordered by `title` (ASC)', () => {
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(hamlet);

    expect(bookshelf.getAllBooks()).toEqual([
      hamlet,
      theHobbit,
      theLordOfTheRings,
    ]);
  });

  it('should return all books of a given author', () => {
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(hamlet);

    const tolkiensBooks = bookshelf.getBooksOf('J. R. R. Tolkien');
    expect(tolkiensBooks.length).toEqual(2);
    expect(tolkiensBooks).toEqual(
      expect.arrayContaining([theLordOfTheRings, theHobbit]),
    );
  });

  it('should return the total number of books', () => {
    bookshelf.addBook(hamlet);
    bookshelf.addBook(candide);

    expect(bookshelf.getTotalNumberOfBooks()).toEqual(2);
  });

  it('should not duplicate a book already stored', () => {
    bookshelf.addBook(aLaRechercheDuTempsPerdu);
    expect(bookshelf.getTotalNumberOfBooks()).toEqual(1);

    bookshelf.addBook(aLaRechercheDuTempsPerdu);
    expect(bookshelf.getTotalNumberOfBooks()).toEqual(1);
  });

  it('should return all books published before a date in string format', () => {
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(candide);
    bookshelf.addBook(hamlet);

    const booksWithStringDate = bookshelf.getBooksPublishedAfter('1700');
    expect(booksWithStringDate.length).toEqual(2);
    expect(booksWithStringDate).toEqual(
      expect.arrayContaining([candide, theHobbit]),
    );

    const booksWithDate = bookshelf.getBooksPublishedAfter(new Date('1700'));
    expect(booksWithDate.length).toEqual(2);
    expect(booksWithDate).toEqual(
      expect.arrayContaining([candide, theHobbit]),
    );
  });
});
