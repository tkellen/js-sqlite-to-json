# sqlite-to-json [![Build Status](https://secure.travis-ci.org/tkellen/node-sqlite-to-json.png)](http://travis-ci.org/tkellen/node-sqlite-to-json)
> Dump data from sqlite databases to JSON files easily.

[![NPM](https://nodei.co/npm/sqlite-to-json.png)](https://nodei.co/npm/sqlite-to-json/)

## API

### constructor(opts)

Create an instance of SqliteToJson.

Example:
```js
const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
  client: new sqlite3.Database('./mydb.sqlite3')
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
const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
  client: new sqlite3.Database('./mydb.sqlite3')
});
exporter.tables(function (err, tables) {
  // all your table names here
});
```

### save(table, dest, cb)

Save the contents of a table to the specified output directory.

Example:
```js
const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
  client: new sqlite3.Database('./mydb.sqlite3')
});
exporter.save('table_name', './data/table_name.json', function (err) {
  // no error and you're good.
});
```

### all(cb)

Returns the entire database and all tables as a single object.

Example:
```js
const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
  client: new sqlite3.Database('./mydb.sqlite3')
});
exporter.all(function (err, all) {
  // all your data here
});
```
