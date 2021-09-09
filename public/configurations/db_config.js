var mysql = require('mysql');

var connection = mysql.createConnection({
    database: 'watugot',
    host: 'localhost',
    user: 'stan',
    password: '',
    stringifyObjects: true,
    dateStrings: true
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection