const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:googleService');

const parser = xml2js.Parser({ explicitArray: false });

function goodleService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=r5oV4OPffoSbhrmou9GEGA`) // TODO
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result.GoodreadsResponse.book);
              resolve(result.GoodreadsResponse.book); // TODO
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
      // resolve({ descritpion: 'our description' });
    });
  }

  return { getBookById };
}

module.exports = goodleService();
