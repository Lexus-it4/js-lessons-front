# js-lessons-front

A task management application.

## Functions 

This application includes the following features:

On the server:
- Get a list with all ToDo's.
- Get ToDo by id. 
- Create ToDo. 
- Edit ToDo by id. 
- Delete ToDo by id. 
- Delete ALL ToDo.

On the client:
- Create ToDo. 
- Edit ToDo. 
- Delete ToDo. 
- Delete ALL ToDo.

## Running

To get started, we'll need to enter:
```
git clone https://github.com/Lexus-it4/js-lessons-front.git
```

Next, create two terminals. In the first, go to the project folder (``cd js-lessons-front``) and write :
```
npm install
npm install cors --save
node server.js
```
This will start a local server with the project backend listening on port 3100 (http://localhost:3100).

In the second, go to the appvue folder (`cd appvue`) and write :
```
npm install
npm run serve
```
This will start a local server with a project frontend listening on port 3000 (http://localhost:3000).

Next, in the address bar of any browser, type `http://localhost:3000`. 

Note: You need to use sqlite3 for this project. 

## Program functionality:

- Create ToDo:

At the top of the page are two fields for entering the name of the new task and its description. After entering information about the new task and pressing the "Save" button, the new task will appear in our database and will be displayed below on the page as a card.
- Edit ToDo:

On each task card there is an "Edit" button that when clicked opens the edit mode for that card. Two new "Update" and "Back" buttons appear in place of the "Edit" button. After making your changes, click "Update" if you want to save the changes you made. If you don't want to save the changes, click "Back."
- Delete ToDo:

There is also a "Delete" button on each task card that, when clicked, will delete the task.
- Delete ALL ToDo:
  
There is also a "Delete All" button at the top of the page, which, when clicked, will delete all tasks.

## Project Features:
1. Sqlite3.
2. Express node js for the server.
3. Vue for the client.
4. Connecting CORS.
