import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/article.css';

export default function ArticleAdd({ add, user, cancel }) {
  const { register, handleSubmit, errors } = useForm();
  const defaultImage =
    'data:image/png;base64,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';
  const [data, setData] = useState({
    urlImage: defaultImage,
    name: 'Name',
    description: 'Description'
  });

  const submit = (data) => {
    const object = { ...data, user };
    add(object);
  };

  const change = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    if (name === 'urlImage' && value.length === 0) {
      value = defaultImage;
    }
    setData({ ...data, [name]: value });
  };
  return (
    <div className='add-article'>
      <form
        onSubmit={handleSubmit(submit)}
        onChange={change}
        style={{ width: '60%' }}
      >
        <h3 className='add-title'> Add new article</h3>
        <div>
          <input
            style={{ width: '100%', margin: '20px 0' }}
            type='text'
            name='name'
            placeholder='Name'
            ref={register({
              required: 'Name required'
            })}
          />
        </div>
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        <div>
          <textarea
            style={{ width: '100%', resize: 'none', margin: '20px 0' }}
            type='text'
            name='description'
            placeholder='Description'
            rows='5'
            ref={register({
              required: 'Description required'
            })}
          />
        </div>
        {errors.description && (
          <p style={{ color: 'red' }}>{errors.description.message}</p>
        )}
        <div>
          <input
            style={{ width: '100%', margin: '20px 0' }}
            type='text'
            name='urlImage'
            placeholder='Image'
            ref={register({
              required: 'Image required'
            })}
          />
        </div>
        {errors.urlImage && (
          <p style={{ color: 'red' }}>{errors.urlImage.message}</p>
        )}
        <div style={{ display: 'flex' }}>
          <button className='add-btn' onClick={() => cancel()}>
            Cancel
          </button>
          <button className='add-btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
      <div className='preview'>
        <div className='article'>
          <img src={data.urlImage} className='article-img'></img>
          <div className='article-content'>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p>@{user.firstname + '_' + user.lastname}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
