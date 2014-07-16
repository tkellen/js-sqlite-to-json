# sqlite-to-json [![Build Status](https://secure.travis-ci.org/tkellen/node-sqlite-to-json.png)](http://travis-ci.org/tkellen/node-sqlite-to-json)
> Dump data from sqlite3 databases to JSON files easily.

[![NPM](https://nodei.co/npm/sqlite-to-json.png)](https://nodei.co/npm/sqlite-to-json/)

## API

### constructor(opts)

Create an instance of Sqlite2Json.

Example:
```js
const Sqlite3ToJson = require('sqlite3-to-json');
const sqlite3 = require('sqlite3');
const exporter = new Sqlite3ToJson({
  client: sqlite3.Database({
    filename: 'mydb.sqlite3'
  })
});
```

#### opts.client

A [sqlite3](https://github.com/mapbox/node-sqlite3) client instance.

Type: `sqlite3.Database`  
Default: `null`


### tables(cb)

List all tables in the current database.

Example:
```js
const Sqlite3ToJson = require('sqlite3-to-json');
const sqlite3 = require('sqlite3');
const exporter = new Sqlite3ToJson({
  client: sqlite3.Database({
    filename: 'mydb.sqlite3'
  })
});
exporter.tables(function (err, tables) {
  // all your table names here
});
```

### save(table, dest, cb)

Save the contents of a table to the specified output directory.

Example:
```js
const Sqlite3ToJson = require('sqlite3-to-json');
const sqlite3 = require('sqlite3');
const exporter = new Sqlite3ToJson({
  client: sqlite3.Database({
    filename: 'mydb.sqlite3'
  })
});
exporter.save('table_name', './data/table_name.json', function (err) {
  // no error and you're good.
});
```
