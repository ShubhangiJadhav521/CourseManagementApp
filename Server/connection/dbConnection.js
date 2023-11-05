const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://0.0.0.0:27017/ems', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});

module.exports = db;
