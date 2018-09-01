const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new Schema( 
    {
        firstName: {type: String, required: true, max: 100}, 
        lastName: {type: String, required: true, max: 100},
        username: {type: String, unique: true, required: true, max: 20}, 
        password: {type: String, required: true, max: 20},   
        bestSpeedId: {type: Number, required: false, default: null}, 
        bestSpeed: {type: Number, required: false, default: null},
        bestDistanceId: {type:Number, required: false, default: null},  
        bestDistance: {type: Number, required: false, default: null}, 
        bestTime: {type: Number, required: false, default: null}, 
        bestTimeId: {type:Number, required: false, default: null}
    },  
);
userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

module.exports = mongoose.model('User', userSchema);