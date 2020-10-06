import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import '../styles/dashboard.css';
import * as articleService from '../services/ArticleService';

export default function Dashboard() {
  const [articles, setArticles] = useState([]);

  const listArticles = () => {
    articleService.list().then((articles) => {
      setArticles(articles);
    });
  };

  useEffect(() => {
    listArticles();
  }, []);

  const items = articles.map((article) => (
    <Article value={article} key={article._id} user={article.user}></Article>
  ));

  return <div className='dashboard'>{items}</div>;
}
