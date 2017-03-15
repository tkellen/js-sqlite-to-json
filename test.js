const fs = require('fs');

const expect = require('chai').expect;
const sqlite3 = require('sqlite3');
const rimraf = require('rimraf').sync;

const SqliteToJson = require('./');

const db = new sqlite3.Database(':memory:');
const exporter = new SqliteToJson({
  client: db
});

const data = [
  { name: 'one' },
  { name: 'two' },
  { name: 'three' },
  { name: 'four' },
  { name: 'five' },
  { name: 'six' },
  { name: 'seven' },
  { name: 'eight' },
  { name: 'nine' },
  { name: 'ten' }
];

describe('sqliteToJson', function () {

  before(function (done) {
    rimraf('./.tmp');
    db.serialize(function() {
      db.run("CREATE TABLE numbers (name TEXT)");
      var stmt = db.prepare("INSERT INTO numbers VALUES (?)");
      data.forEach(function(row) {
        stmt.run(row.name);
      });
      stmt.finalize();
      done();
    });
  });

  describe('#tables', function () {

    it('should callback with all tables in the specified database', function (done) {
      exporter.tables(function (err, tables) {
        expect(tables).to.deep.equal(['numbers']);
        done();
      });
    });

  });

  describe('#save', function () {

    it('should callback with error if no destination is specified', function (done) {
      var dest = './.tmp/numbers.json';
      exporter.save('numbers', null, function(err) {
        expect(err).to.not.be.null;
        done();
      })
    });

    it('should throw if no callback is specified', function () {
      expect(function () {
        exporter.save('numbers', 'file');
      }).to.throw(/No callback/);
    });

    it('should export a table in a database to a file', function (done) {
      var dest = './.tmp/numbers.json';
      exporter.save('numbers', dest, function (err) {
        expect(JSON.parse(fs.readFileSync(dest))).to.deep.equal(data);
        done(err);
      });
    });

  });

  describe('#all', function() {
    it('should export all data into a single object', function(done) {
      exporter.all(function (err, all) {
        expect(all && all.numbers).to.deep.equal(data);
        done();
      })
    })
  });

});
