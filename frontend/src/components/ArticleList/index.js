import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import SingleArticle from '../SingleArticle';
import ArticleDetail from '../ArticleDetail';
// 5. Replace import of action creator with thunk creator
import { getAllArticles } from '../../store/articleReducer';

const ArticleList = () => {
  const dispatch = useDispatch();

  const articlesObject = useSelector((state) => state.articleState.entries);
  const articles = Object.values(articlesObject)

  useEffect(() => {
    // 5. Dispatch the return value of the thunk creator instead (the thunk)
    dispatch(getAllArticles());
  }, [dispatch]);

  return (
    <div>
      <h1>ArticleList</h1>
      <ol>
        {articles.map(({ id, title }) => (
          <ArticleDetail key={id} id={id} title={title} />
        ))}
      </ol>

      <Switch>
        <Route path="/article/:id">
          <SingleArticle articles={articles} />
        </Route>
      </Switch>
    </div>
  );
};

export default ArticleList;
