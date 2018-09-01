const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hi sweetheart! <3 <3 <3');
}; 

exports.create =  async function (req, res) {  
    const body = req.body;
    const userRequest = new User ({ 
        firstName: body.firstName, 
        lastName: body.lastName,
        username: body.username,
        password: body.password, 
        bestSpeedId: null,  
        bestSpeed: null,  
        bestDistanceId: null,  
        bestDistance: null, 
        bestTimeId: null, 
        bestTime: null 
    });  

    let userResponse;
    try { 
        userResponse = await userRequest.save();
    } catch (err) { 
        console.log(err);
    }
    console.log(userResponse); 

    const response = {  
        user: userResponse,  
        statusCode: 200, 
        message: 'User created successfully'
    };
        
    res.send(response);
}; 

