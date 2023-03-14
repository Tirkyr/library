const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');


const adminRouter = express.Router();
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'libraryApp';
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }];


function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      (async function mongo() {
        const client = new MongoClient(url);
        try {
          await client.connect();
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = db.collection('books');
          const response = col.insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        } finally {
          await client.close();
        }
      }()).catch(() => {});
    });
  return adminRouter;
}

module.exports = router;
