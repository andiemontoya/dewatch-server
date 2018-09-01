const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.route'); 
const exerciseRoutes = require('./routes/exercise.route');
const app = express();  

//const dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial'; 
const dev_db_url = 'mongodb://hehe:abcd1234@ds125821.mlab.com:25821/dewatch-2';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', userRoutes);  
app.use('/exercises', exerciseRoutes);  

const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
