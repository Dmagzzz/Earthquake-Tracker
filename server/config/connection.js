const mongoose = require('mongoose');


// mongoose.connect("mongodb+srv://dmancini87:MD4aZucM9uLeokj2@cluster0.btugrlz.mongodb.net/?retryWrites=true&w=majority", {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/EarthquakeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
