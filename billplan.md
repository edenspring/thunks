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
- talk about parens in action creator if you wanna but meh
- stuff is pretty much the same
- time to make a thunk creator for our GET request
- name it something contextual to the application, something that makes sense
- its a function that returns a function, return function takes in dispatch as 
  first param, but can also take getState
  - useful for something like isLoading, block fetches if loaded
- return function can also be async, and pretty much always will be so that we
  don't have to do any promise chaining
- check out backend readme for routes
```js
export const getArticles = () => async (dispatch) => {
  const response = await fetch('/api/articles');
  console.log(response)
}
```
- when testing in browser
```js
store.dispatch(articleActions.getArticles())
```
- convert response to data
- console log data
- mention about needing to refresh
- now it's time to dispatch loadArticles

# uh oh spaghetti ohs
- notice we're getting an error now, but why? well lets find out
- debugger? gonna look crazy, but look what you can do!
- or, you know, console.log it. you'll have to scroll above the error to see it
- we know the error is in our action.articles, but why? well, thinking back to
  yesterday's lecture, we might be dispatching our action creator somehwere and
  not providing an argument
- take a look at ArticleList, our useEffect is dispatching our loadArticles
  action creator
- how can we fix
- dispatch the thunk creator, the function that returns the thunk
- also consider removing your debugger
- how does dispatch do all this? getArticles will return another function, when
  our redux-thunk middleware sees that our dispatch has been handed something 
  that is typeof function it says hold up and instead invokes that function
  (the thunk) passing in both dispatch and getState. getState, you guessed it,
  gets our state.

# Why they not render when clicky?
- think about all the times we've run into mismatched data types with strict
  equality. in our SingleArticle component we're getting a string back from our
  useParams, however our ids are numbers
- let's use the unary operator (not ==, thien.)

# posting -- with thunks
- check out backend readme for routes
- maybe check the docs if you don't remember how to post
```js
export const createArticle = (payload) => async (dispatch) => {
  const response = await fetch('/api/articles',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
}
```
- can console.log the response if we want, will first need to replace dispatch
  action in ArticleInput with this new thunk creator
- see the response? and there's the data?
- on refresh we'll see what we post to the db, but how to make dynamic
- glad you asked
- build out the rest of the thunk to dispatch our data with the addArticle
  action creator

# using what we return from our dispatch in our component
- we'll need to make our handle submit async, dispatch gonna return a promise
- i guess we could show that first

# quamstions
- gimme your questions and i'll give you some lies

# maybe refactor with normalized state. maybe. i dunno. maybe.
- talk a bit about why we should do that
- refactor using reduce, like a boss. or forEach, like a coward. be a boss.




