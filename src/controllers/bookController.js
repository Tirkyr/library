const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'libraryApp';

    (async function mongo() {
      const client = new MongoClient(url);
      try {
        await client.connect();
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = db.collection('books');
        const books = await col.find().toArray();

        res.render('bookListView', {
          nav,
          title: 'Library',
          books
        });
      } catch (err) {
        debug(err.stack);
      } finally {
        await client.close();
      }
    }()).catch(() => { });
  }


  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'libraryApp';

    (async function mongo() {
      const client = new MongoClient(url);
      try {
        await client.connect();
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });

        book.details = await bookService.getBookById(book.bookId);

        res.render('bookView', {
          nav,
          title: 'Library',
          book
        });
      } catch (err) {
        debug(err.stack);
      } finally {
        await client.close();
      }
    }()).catch(() => { });
  }


  function middleware(req, res, next) {
    // if (req.user) {
      next();
    // } else {
    //   res.redirect('/');
    // }
  }


  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
