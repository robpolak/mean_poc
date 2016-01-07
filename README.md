
# Mean POC Project
Please implement this project within a reasonable time frame.  I will function as the business owner for any questions/clarifications.  Remember this is a test to see how you structure your code as well as your depth of knowledge in programming patterns.  This is a really good read for es5 patterns : https://addyosmani.com/resources/essentialjsdesignpatterns/book/ (not as applicable to es6)

## Project Setup
1.  Create a Node project.
2.  Leverage the M-MEAN-J stack
  * Mongo
  * Mongoose
  * Express
  * Angular
  * Node
  * Jade
3.  Register for a free mongo-db at mongolabs.com (free sandboxes).
4.  Project should be api-driven.
5.  The entire project should be data-driven using mongoose to write data to mongo.
6.  Feel free to use angular plugins.

## Functionality
1.  One screen to edit/save users
  * First Name - Required, max 50 charaters
  * Last Name - Required, max 50 characters
  * Phone Number - Not required but must be in format 1112223333.
  * Father - bonus - Assign a father to a given user (i.e. assocate one user to another, not just a name, should link to a user record in mongo)
  * Mother - bonus - Assign a monther to a given user (i.e. assocate one user to another, not just a name, should link to a user record in mongo)
  
2.  Screen to list all users
  * Users should be able to click a button to edit a specific user.


## Bonus Points
1.  Custom directive that will load a users name based on a ID lookup
    i.e. <user user-id='id'/>  would render <div> Robert Polak <div> 
2. Show your css/html skills, bootstrap.
3. Demonstate a couple Unit Tests
