const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {type: String, required: true, max: 100}, 
    lastName: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 20}, 
    password: {type: String, required: true, max: 20}
});


// Export the model
module.exports = mongoose.model('User', userSchema);