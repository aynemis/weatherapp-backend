const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://yasmine:YLLWr8XUn2YqZUK2@cluster0.aew4zas.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
