const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
console.log(username+" "+password);
const url = `mongodb+srv://${username}:${password}@osf-shop.xxyx0jj.mongodb.net/shop`;
const mongoose = require('mongoose')
const connectionParams={
 useNewUrlParser: true,

 useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
 .then( () => {
     console.log('Connected to the database ')
 })
 .catch( (err) => {
     console.error(`Error connecting to the database. n${err}`);
 })

 module.exports = mongoose;