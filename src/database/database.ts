import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'thuchicanhan.sqlite3',
    // createFromLocation: 1,
    location: 'default',
  },
  () => {
    console.log('Open Database Successful');
  },
  (error) => {
    console.log('ERROR: ' + error);
  },
);

export default db;
