# Gabba Chat!

Chat app for Guild take-home assessment

## Setup
### Getting started

* Node -v 16.13.0
* sass (https://sass-lang.com/install) **OR** node-sass (built in, just run npm/yarn installer...)


Before you run the application, there's one file you need to add that's been 
excluded for security reasons, a *keys_dev.js* file.

In the server/src/config directory, please add a file named *keys_dev.js* with the following content:
PLEAES REFER TO ATTACHED DOCUMENTS FOR PASSWORD!
```js
// server/src/config/keys_dev.js
// Replace USERNAME/PASSWORD_HERE with credentials in added documents!
module.exports = {
  mongoURI: 'mongodb+srv://USERNAME:PASSWORD_HEREg@gabba-chat-dev.5nzne.mongodb.net/guild-project?retryWrites=true&w=majority',
  secretOrKey: 'none'
}
```
*The user/password is limited to read/write in just one database and expires in 1 week.  Please let me know if renewed credentials are needed!*

### Installing
Run the following yarn commands from the root directory to install and build:
```bash
yarn install

yarn client-build # IF YOU HAVE AND USE SASS!

yarn client-build-alt # IF YOU'RE JUST USING THE INCLUDED NODE-SASS COMPILER!
```
*Do please note the difference between the two build commands. They do the same thing, but one requires an external program*


### Running
In the root directory, there are a series of commands you can run to get things spun up.
```bash
yarn dev # Will run a live development environment on localhost:3000 (if you have and use sass, etc.)

yarn dev-alt # Will run a live development environment on localhost:3000 with the included node-sass compiler

yarn staging # Will run the static client build directly on the server at localhost:5001
```

Alternatively, if you have experience with React/node applications, you can always dig into the client and server directories for the commands I tend to use when actually developing the project.

#

## Assessment MVP
* Possible to type a short message and have it sent to another user
* Possible to see messages sent from another user appear reasonably soon after they were sent

## App Details
### Login/Signup Pane
* Users can login using handle/password. Two such users are provided on screen
* Incorrect login credentials alerts the user as such, and the message is removed as soon as they update the login fields
* Login/Signup buttons swap between Login/Signup panels
* Users can signup, using handle/password, and password match
* Non-matching signup passwords immediately alert the user with a message and prevent signup triggering. The message is removed once passwords match
* On submission, previously registered handles will alert user. Updating fields will immediately remove the alert
* Correct login credentials will switch to the messages pane

### Messages Pane
* On render, will automatically connect user to socket listener for the room, watch for incoming messages, and load the first two latest pages of messages for the given room ('General' by default)
* Messages will appear with the user handle and time of post
in their header. Contents displayed below
* On scroll to top, older messages will load page by page until no more messages are available. Scroll height/position should be maintained
* If the scroll position is at or fairly near the bottom, incoming NEW messages will automatically scroll down into view -  scrolling up and/or viewing older messages pauses this effect
* Users can type a message up to 256 charecters in length and post
* New messages should arrive to all users near instanly


# Implementation Details / Thoughts

### Messages
Messages are implemented as buckets/pages in the database.
Once a page is filled, a new message will automatically generate a new page.  Messages are retrieved per page, and pages are ordered by a hybrid name/date index, grouping pages by the room they belong too and simultaneously in order of creation.

Loading previous pages uses the last loaded page's creation date to filter and find the most RECENT page created BEFORE the one last loaded.  This process repeats as you move backwards through previous pages, ensuring very fast query/retrival!

The page size has been limited to 25 for this project as a demonstration, but larger page sizes would scale much better as the database grows.  However, larger page sizes would also necessitate a secondary mechanism to control how many messages each bucket is meant to return, with an element to also track the current index within a bucket.  Needless to say that's too complicated for an afternoon project!

### Rooms
I built the project with expandability in mind.  Adding a feature to allow the user to switch and create new rooms would be the next most obvious major component!  The messages pane, server, and socket implementation already support this by design!  It's just a matter of adding React/Redux components and triggers to switch rooms, as well as adding a simple Room model/routes on the server, etc.  

### Sockets
The socket API and middleware is the most exciting part of this project, as it has the most promise and is simultaneously the least utilized thing.  It's inspired by a previous project I'd abandoned and even then was based on someone else's great ideas.  It creates a transparent socket API that easily connects and passes other actions, allows for one-line watcher/polling functions, and splits actions into multiple new ones based on circumstance.

#

## Bugs
* If you click and hold the scrollbar up near the top, it will rapidly and continually load older pages until there are none left.  This *might* load them out of order or double load a few, but I haven't actually seen this happen yet.
#
## Theoretical Future Todos
* Add persistence on refresh
* Add JWT web tokenization for credentials
* Add auth/protected routes using credentials
* Add better and more complete validations
* Add message deletion
* Add message content search
* Add extra messaging features (emojis, etc)
* Add rooms switching/creation
  * Add whitelist/blacklist
  * Add private option
  * Add direct messaging
* Increase bucket sizes and implement secondary "inner-page" fetching/scrolling
* ...
