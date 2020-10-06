import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as userService from '../services/UserService';
import * as articleService from '../services/ArticleService';
import Article from '../components/Article';
import ArticleAdd from '../components/ArticleAdd';
import '../styles/user.css';

import { AuthContext } from '../contexts/AuthContext';
export default function UserBoard() {
  const { email } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [addItem, setAddItem] = useState(false);
  let defaultUser =
    email == currentUser.email
      ? currentUser
      : { firstname: '', lastname: '', email };
  const [user, setUser] = useState(defaultUser);

  const getArticles = () => {
    userService.getArticles(user._id).then((res) => {
      setArticles(res);
    });
  };

  const getUser = () => {
    userService.get(email).then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    if (!user._id) {
      getUser();
    } else {
      getArticles();
    }
  }, [user]);

  const add = (article) => {
    articleService.post(article).then((res) => {
      if (res) {
        setArticles([res.article, ...articles]);
        setAddItem(false);
      }
    });
  };

  const remove = (id) => {
    articleService.remove(id).then((res) => {
      if (res && res.deletedCount && res.ok) {
        setArticles(articles.filter((a) => a._id !== id));
      }
    });
  };

  const items = articles.map((article) => (
    <Article
      value={article}
      key={article._id}
      user={user}
      remove={user._id == currentUser._id ? remove : null}
    ></Article>
  ));

  return !addItem ? (
    <div className='userBoard'>
      <div className='user'>
        <img
          width='250px'
          height='250px'
          src='data:image/jpeg;base64,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GhCw58BoZDd9HA8neXU8Lj6kL5y2a2trsNJ9lm+jJu6CUGSBx78t+yebSCVsvB+mencAKylkhdxfTls0fiQcrh4DMuW2K0dm9clZ7r8zZugabtooGnvbBE0/ALyxMU9PG7LGxht72RvZ8L/W+W886XjHTJSMBFJTyVD+DpbQRfi4+gWsNo9rq3ECevkyxm9oYgWR27jxd56ckritPdM5awmNstrGTOFPTm8Ae0zvafzoBvkaeLefHw312unlrajr5NTNKGAC9mDSzRyA/E8ViQ05Lmt+2wkfG3yVp2doB1UJdoc5fc8Br8t/kumtIhjNpvPV2xJ/U1Wf6r6F7j4se/8ACypYVn26lAqIWMPZbTDXjZ73usfLL6qsqykiIihAiIgIiICIiAiIgIiICIiAiIgIiIC9Kad0ckcjdHRva9vi0gj5LzRBYKXaDLCxrwczKgk8bwvEhcPEPdf0XfFomippXN9yRoaCNR3D5hVxZYrj1IjdvicJIXd3e3w4jwUp2z58Jcz2oW0a0Pb5Hh6rEqaAsy3FrwCQ+KvTomuzNuC/KwuZxDJMwafMtOnMd6idqI+rjc230jrQtHnw+ClaYVyGhvkfbs9Vnd4gL2jwh5jg01ldc94ACtDaFoiEY4MDL8rglZM9oixruyXEMYOZaXAegKaPCrNLADiAaNRE3XyH7yu1XjrWsrIo+LI4ICNwHbEr/Q2HkVF+3Fonyn6SZxDnfZZfcOZ+QWAoV2966qdNI6R28hgt3BrQ0D0C8ERQgREQEREBERAREQEREBERAREQEREBERAREQEsiIJjCcafFNVTvOZ8sEjRfcZLt6s+At5ALPqJjNHg5JuSWNcTvJjdk1/VVYWVDXuY2EAX6iYTR3O7UEt8LtB8ypTErnV4w2P2xugfSRROjv8AWfIB62c9noqtiOKGWnoWXOeASB5ubk3b1br9+UfNeON1LZqqeVnuSODm30NsrdD4bvJYKEy5e65JO8kk+a4RFCBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREHC5REHC5REBERAREQEREBERAREQEREBERAREQEREBERAREQFwiIOUREH//2Q=='
          className='article-img'
        ></img>
        <p>@{user.firstname + '_' + user.lastname}</p>
        <p>Firstname : {user.firstname}</p>
        <p>Lastname : {user.lastname}</p>
        <p>Email : {user.email}</p>
        {user._id === currentUser._id && (
          <button onClick={() => setAddItem(true)}>Add Article</button>
        )}
      </div>
      <div className='articles'>{items}</div>
    </div>
  ) : (
    <div style={{ marginTop: '30px' }}>
      <ArticleAdd
        add={add}
        user={user}
        cancel={() => setAddItem(false)}
      ></ArticleAdd>
    </div>
  );
}
