#CarShow

##Initial Setup
* Add Landing Page
* Add CarShows Page that lists all CarShows

Each Campground has:
   * Name
   * Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New CarShows
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the CarShows page
* Add a better header/title
* Make CarShows display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely


RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /carshow      GET   Display a list of all carshow
NEW     /carshow/new  GET   Displays form to make a new dog
CREATE  /carshow      POST  Add new dog to DB
SHOW    /carshow/:id  GET   Shows info about one dog

INDEX   /CarShows
NEW     /CarShows/new
CREATE  /CarShows
SHOW    /CarShows/:id

NEW     CarShows/:id/comments/new    GET
CREATE  CarShows/:id/comments      POST