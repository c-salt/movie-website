const db_connector = require('./helpers/db-connector');

db_connector.addUser('test2@test.com', 'test2', 'bigg@y');
console.log('DONE');
db_connector.getAllUsers();
console.log('DONE2');