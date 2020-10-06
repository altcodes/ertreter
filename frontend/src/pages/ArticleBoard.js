import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/Article';
import CommentAdd from '../components/CommentAdd';
import { AuthContext } from '../contexts/AuthContext';
import * as articleService from '../services/ArticleService';
import * as commentService from '../services/CommentService';
import '../styles/article.css';

export default function ArticleBoard() {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [article, setArticle] = useState({
    user: '',
    _id: '',
    name: '',
    description: '',
    createdAt: ''
  });
  const [comments, setComments] = useState([]);
  const getArticle = () => {
    articleService.get(id).then((res) => {
      setArticle(res);
    });
  };
  const getComments = () => {
    articleService.getComments(id).then((res) => {
      setComments(res);
    });
  };

  const add = (comment) => {
    commentService.post(comment).then((res) => {
      if (res) {
        setComments([res.comment, ...comments]);
      }
    });
  };

  useEffect(() => {
    getArticle();
    getComments();
  }, []);

  return (
    <div className='articleboard'>
      <Article
        value={article}
        key={article._id}
        user={article.user}
        see={false}
      />
      <div>
        <CommentAdd add={add} user={currentUser} article={article}></CommentAdd>
        Commentaires
      </div>
      <div>{comments.length}</div>
    </div>
  );
}
