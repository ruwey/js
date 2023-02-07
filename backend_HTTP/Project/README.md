# HTTP Backend Project - 20 points #

## Directions: ## 
Build the back end service of a music app. The app organizes its content by genres: pop, hip hop, rap, classical, rock, jazz, blues, and electronic. 
You are to build the endpoints of this application using HTTP GET, POST, PUT and DELETE requests to simulate how to manage the database. ( no actual database here, just arrays)
All operations related to music genres will be done by sending HTTP GET, POST, PUT and DELETE requests to this endpoint in order to get, create, update and detele data.

Tools needed: vsCode, Chrome browser, Postman and (optional) Nodemon utility.

UPDATED! 
RUBRIC: 5 points each properly coded route with POSTMAN operation

* http route for GET requests ( you code a home route that displays a custom message for you music app, a route that displays all the musical genres ( or songs) of the app, a route that displays each genre (or song) by id, and a route that filters requests based on year and month - this returns the month and year you look for) Extra: You can create another filter of your choice. )

* http route for POST requests ( you code the POST requests and then use POSTMAN to add a new genre or song. Then you display the new listing of genres or songs; You also need code a condition that checks the length of the genre or song name. For ex "name of the genre should have a minimum and maximum number of characters") 

* http route for PUT requests ( you code the PUT requests and add code to validate the request such as: 'Name is required" and "The name has to be at least three character long"; in POSTMAN you update one genre (or song) of your choice. Run and test the update to get a 200 OK status message and then a 400 status message saying that the name of the character should be at least three, or more characters long - you can make the requirement alpha numeric for an extra challenge)

* http route for DELETE requests (you code the DELETE request and in POSTMAN you should be able to look up a genre ( or song) by id and delete it by index. In POSTMAN get a 400 status message for a BAD request and also a 200 OK status message for a succesful operation. ) 

Extra credit +1 point for more features in the code that enhance the service such as serving different types of files or creating more advanced filters and functionality based on the Express api documentation.  

WHAT YOU TURN IN

* the js file with proper annotation ( name, class, date) and all the routes for the four requests: GET, POST, PUT and DELETE in a clear and readable manner with comments
* screen recording ( GIF or video format) starting with your POSTMAN homepage that displays your name, then showing the POSTMAN operations for each route and getting a 404 or 400 status message and at least a 200 OK status message per route
* short reflection as a JS comment in which you explain (1) how programs communicate in what order to each other for a given purpose, (2) what you learned in this project and (3) how can this project be further extended.  







