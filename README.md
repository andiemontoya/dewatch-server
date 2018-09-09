# DeWatch API

Http server written in NodeJS originally intended as a backend for [DeWatch](). It is essentially a CRUD API for a MongoDB database hosted on [mLab](https://mlab.com/).

# Libraries Used 
   - [Express]() - routing framework for requests
   - [BodyParser]() - middleware for parsing request bodies
   - [Mongoose]() - object document mapper for MongoDB
   - [JsonWebToken]() - generates and authentictes JWTs
   - [BCryptJS]() - used to hash passwords and compare submitted passwords against hashed versions

# Endpoints
#### Signup - POST user/create
  - Creates a new user
#### Login - POST user/login
 -  Verfies username and password 
 -  Returns a JWT to use in other requests  
### Create a new exercise - POST exercises/{userId} 
- Creates a new exercise associated with a user 
- Compares exercise data against personal best records and sets new records if necessary  
### Get an exercise by ID - GET exercises/{exerciseId}  
- Retrieves exercise data associated with given ID 
### Get all exercises of a user - GET exercises/{userId} 
- Retrieves all exercise associated with the user 

# Authentication 
All requests aside from signup and login must have a JWT in their header under the field *x-access-token*. JWTs are returned after login or signup and expire after 24 hours.  

# Tutorials followed 
- https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
- https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52 

