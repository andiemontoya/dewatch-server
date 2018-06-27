const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 
const userRoutes = require('./routes/user.route'); 

app.use('/user', userRoutes);  

let port = process.env.PORT || 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
