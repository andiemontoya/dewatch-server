const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let exerciseSchema = new Schema( 
    { 
        time: {type: Number, required: true}, 
        speed: {type: Number, required: true},
        distance: {type: Number, required: true},  
        userId: {type: Number, required: true}
    },  
    { 
        timestamps: true
    }, 
    { 
        _id: false 
    }
);
exerciseSchema.plugin(AutoIncrement, {inc_field: 'exerciseId'});

module.exports = mongoose.model('Exercise', exerciseSchema);