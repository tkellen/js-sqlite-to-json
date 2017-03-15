const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const SqliteToJson = module.exports = function SqliteToJson(opts) {
  opts = opts || {};
  if (!opts.client) {
    throw new Error('No sqlite3 client provided.');
  }
  this.client = opts.client;
};

SqliteToJson.prototype.tables = function (cb) {
  var query = "SELECT name FROM sqlite_master WHERE type='table'";
  this.client.all(query, function (err, tables) {
    if (err) {
      return cb(err);
    }
    cb(null, tables.map(function (result) {
      return result.name;
    }));
  });
};

SqliteToJson.prototype.save = function (table, dest, cb) {
  if (typeof cb !== 'function') {
    throw new Error('No callback specified.');
  }
  if (!dest) {
    return cb(new Error('No destination file specified.'));
  }
  this._dataFor(table, function (dataErr, tableData) {
    if (dataErr) {
      cb(dataErr);
    } else {
      mkdirp(path.dirname(dest), function (mkdirErr) {
        if (mkdirErr) {
          cb(mkdirErr);
        } else {
          fs.writeFile(dest, JSON.stringify(tableData), function (writeErr) {
            if (writeErr) {
              cb(writeErr);
            } else {
              cb(null);
            }
          });
        }
      });
    }
  });
};

SqliteToJson.prototype.all = function(cb) {
  var self = this;
  this.tables(function (err, tables) {
    if (err) return cb(err);
    var ret = {};
    function loop (i) {
      if (i === tables.length) cb(null, ret);
      else self._dataFor(tables[i], function (dataErr, tableData) {
        if (dataErr) cb(dataErr);
        else loop(i + 1, ret[tables[i]] = tableData);
      })
    }
    loop(0);
  })
};

SqliteToJson.prototype._dataFor = function (table, cb) {
  // apparently you can't used named params for table names?
  this.client.all('SELECT * FROM '+table, cb);
};
