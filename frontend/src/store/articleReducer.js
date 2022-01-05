// import articles from '../data/data.json';

const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

export const addArticle = (newArticle) => ({
  type: ADD_ARTICLE,
  newArticle,
});

export const loadArticles = (articles) => {
  return { type: LOAD_ARTICLES, articles };
};

// 4. Create thunk creator for GET request
export const getArticles = () => async (dispatch, getState) => {
  const response = await fetch('/api/articles');
  // console.log(response)
  const data = await response.json()
  // console.log(data)
  // console.log(getState())
  dispatch(loadArticles(data))
}

// 7. Create thunk creator for POST request
export const createArticle = (payload) => async (dispatch) => {
  const response = await fetch('/api/articles',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  // console.log(response)
  const data = await response.json()
  // console.log(data)
  dispatch(addArticle(data));
  return data;
}


const initialState = { entries: [], isLoading: true, likes: 0 };

const articleReducer = (state = initialState, action) => {
  // debugger;
  let newState;
  switch (action.type) {
    case LOAD_ARTICLES:
      newState = {...state}
      newState.entries = action.articles.reduce((entries, article) => {
        entries[article.id] = article
        return entries
      }, {})
      return newState; // o(1) refactor
      // return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      newState = {...state}
      newState.entries = {...newState.entries, [action.newArticle.id]:action.newArticle};
      return newState;
      //return { ...state, entries: [...state.entries, action.newArticle] };
    default:
      return state;
  }
};

export default articleReducer;
