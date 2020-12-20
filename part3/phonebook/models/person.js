const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://YelpAdmin:${password}@cluster0-shard-00-00.fwsk3.mongodb.net:27017 cluster0-shard-00-01.fwsk3.mongodb.net:27017,cluster0-shard-00-02.fwsk3.mongodb.net:27017/Persons?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin`;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});


