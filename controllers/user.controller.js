const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hi sweetheart! <3 <3 <3');
}; 

exports.create =  async function (req, res) {  
    const body = req.body; 
    const hashedPassword = bcrypt.hashSync(req.body.password);
    
    const userRequest = new User ({ 
        firstName: body.firstName, 
        lastName: body.lastName,
        username: body.username,
        password: hashedPassword, 
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
        res.send('Error: could not create user');
    } 

    const token = jwt.sign({ id: userResponse.userId }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    const response = {  
        user: userResponse, //for development 
        auth: true,   
        token: token,
        statusCode: 200, 
        message: 'User created successfully'
    };
        
    res.send(response);
};  

exports.login = async (req, res) => {  
    const username = req.body.username; 
    const password = req.body.password; 

    //Check that user exists  
    let user;
    try { 
        user = await User.findOne({username: username});  
    } catch (err) { 
        console.log(err); 
        res.send('User does not exist');
    }  

    //Check that password is correct
    const passwordIsValid = bcrypt.compareSync(password, user.password); 

    if (passwordIsValid) { 
        const token = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
    
        const response = {  
            auth: true,   
            token: token,
            statusCode: 200, 
            message: 'User logged in successfully'
        };
            
        res.send(response);
    } 
    
    else { 
         res.send('Login failed');
    }
   
};

