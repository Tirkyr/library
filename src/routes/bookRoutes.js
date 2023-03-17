const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'libraryApp';

function router(nav) {
  bookRouter.use((req, res, next) =>{
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get((req, res) => {
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
      }()).catch(() => {});
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      (async function mongo() {
        const client = new MongoClient(url);
        try {
          await client.connect();
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });

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
      }());
    });
  return bookRouter;
}

module.exports = router;
