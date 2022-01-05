# review redux
- action
  - action creator
  - needs a type, will complain if not given type
- dispatch
  - returned from useDispatch hook (react-redux)
  - will then dispatch the return value of your action creator, that returned
    action will then hit your root reducer to see if its type matches any case
- middleware
  - in our store, using applyMiddleware from redux
  - right now using logger which will log our action
  - remember that middleware literally sits in the middle of our functions and
    intercepts as it goes. 
  - adding a new middleware to handle our thunks
  - thunks are functions, when middleware sees that, it will know how to handle
    the function and use the same dispatch inside of the thunk
- what are thunks?
  - subroutine used to inject a calculation into another routine.. blah blah
  - really just functions that return functions, or thunk actions
  - usually follows this form
  ```js
  export const thunkCreator = data => (dispatch, getState) => {
      // body of thunktion
  }
  ```
  - notice our data param, we have access to it in our thunk through the magic
    of closure (remember mod 1 closure? I do)
# show objectives slide
- talk about them objectives
- get into project
# the project
- prview the readme
- open two terminals, talk about 2 terminals
- npm install in both backend and frontend
- walk through .env using .env example
- create a user in our psql database using info in .env
```bash
psql
CREATE USER article_app WITH PASSWORD 'password' CREATEDB LOGIN;
\q
```
- after user created, npm run db:setup
  -  show script maybe
- can now npm start backend, but not front end yet, need to install middleware
# when to use thunks
- talk about normal react-redux flow
- with thunk, we can access api with fetches
- show gif, middleware calls thunk action passing in dispatch so we can dispatch
  something after our fetch comes back
- after that it will dispatch a regular action with whatever data give it, hit
  the reducer and update our state accordingly
- show instructions, talk about it
- front end npm install redux-thunk
- start server, show this is the same app from yesterday, show the refresh kills article
# the work begins
- won't be doing anything with backend
- check it out if you want, but you don't have to
- we need to set up a proxy key in /frontend/package.json, don't forget to add
  a comma
```json
"proxy": "http://localhost:5000"
```
- if anyone asks, create react app and react scripts handle the proxy key,
``` 
https://create-react-app.dev/docs/proxying-api-requests-in-development/
```
- talk about connecting article list and article input, list will be fetching
  the list of articles, articleInput gonna post
# add thunk middleware
- store/index.js
- import thunk from 'redux-thunk'; thunk is the default export from redux-thunk
- add it to middleware, we want it in both production and not production
- don't need to expose stuff in console with logger to our users
# look at store/articleReducer.js
- talk about parens if you wanna but meh
- stuff is pretty much the same
- time to make a thunk creator for our GET request
- name it something contextual to the application, something that makes sense
- its a function that returns a function
# components/ArticleList
- its about to get thunky
- rather than dispatching our 


