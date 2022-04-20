import { createConnection } from 'mysql';

var connection = createConnection({
    database: 'watugot',
    host: 'localhost',
    user: 'root',
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

export default connection