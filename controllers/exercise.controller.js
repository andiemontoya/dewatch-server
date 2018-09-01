const User = require('../models/user.model');
const Exercise = require('../models/exercise.model'); 

exports.create =  async function (req, res) {    
    const body = req.body; 
    const exerciseRequest = new Exercise ({ 
        time: body.time,  
        speed: body.speed,
        distance: body.distance,  
        userId: body.userId
    });   
    
    //Create the new exercise for the user
    let exerciseResponse;
    try {  
        exerciseResponse = await exerciseRequest.save();
    } catch (err) {   
        console.log(err);
        res.send('Error');
    }
    
    //Check if the user's personal bests should be updated
    let personalBests;
    try { 
        personalBests = await getPersonalBests(body.userId, exerciseResponse);
    } catch (err) {  
        console.log(err);
        res.send('Error');
    }
       
    //Update personal bests
    let userResponse;
    if (personalBests.update) {  
        try {
            userResponse = await User.findOneAndUpdate(
                {userId : body.userId},
                {$set: personalBests.records},
                {new : true}
            );
        } catch (err) { 
            console.log(err);
            res.send('Error');
        }
    }
  
    const response = {  
        exercise: exerciseResponse, 
        user: userResponse,  
        statusCode: 200, 
        message: 'Exercise created successfully'
    };
        
    res.send(response);
};  

exports.get =  async (req, res) => { 
    const exerciseId = req.params.exerciseId; 

    let exerciseResponse; 
    try { 
        exerciseResponse = await Exercise.findOne({exerciseId: exerciseId});
    } catch (err) { 
        console.log(err);
        res.send('Error: Could not retrieve exercise');
    }
    
    const response = {  
        data: exerciseResponse, 
        statusCode: 200, 
        message: 'Exercise retrieved successfully'    
    };

    res.send(response);
}; 

exports.getAll =  async (req, res) => { 
    const userId = req.params.userId;
    
    let exercisesResponse; 
    try { 
        exercisesResponse = await Exercise.find({userId: userId});
    } catch (err) { 
        console.log(err);
        res.send('Error: Could not retrieve exercises');
    } 
        
    const response = {  
        data: exercisesResponse, 
        statusCode: 200, 
        message: 'Exercises retrieved successfully'    
    };

    res.send(response);
};

const getPersonalBests = async (userId, exercise) => { 
    let user; 
    let updateSpeed; 
    let updateDistance; 
    let updateTime;  
    let update; 
    let records = {};  

    try { 
        user = await User.findOne({userId: userId});  
        updateSpeed = user.bestSpeed === null || user.bestSpeed < exercise.speed;  
        updateDistance = user.bestDistance === null || user.bestDistance < exercise.distance; 
        updateTime = user.bestTime === null || user.bestTime > exercise.time; 
    } catch (err) { 
        console.log(err);
    }  

    update = updateSpeed && updateDistance && updateTime;  
    records.bestSpeed = updateSpeed ? exercise.speed : user.bestSpeed; 
    records.bestDistance = updateDistance ? exercise.distance : user.bestDistance; 
    records.bestTime = updateTime ? exercise.time : user.bestTime; 
    records.bestSpeedId = updateSpeed ? exercise.exerciseId : user.bestSpeedId; 
    records.bestDistanceId = updateDistance? exercise.exerciseId : user.bestSpeedId; 
    records.bestTimeId = updateTime ? exercise.exerciseId : user.bestTimeId; 
    
    return { 
        records: records,
        update: update
    }; 
};

