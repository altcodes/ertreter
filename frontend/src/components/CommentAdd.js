import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/comment.css';
export default function CommentAdd({ add, user, article }) {
  const { register, handleSubmit, errors } = useForm();

  const submit = (data) => {
    const object = { ...data, user, article };
    add(object);
  };

  return (
    <div className='add-comment'>
      <form onSubmit={handleSubmit(submit)} style={{ width: '60%' }}>
        <h3 className='add-title'> Add new comment</h3>
        <div>
          <textarea
            style={{ width: '100%', resize: 'none', margin: '20px 0' }}
            type='text'
            name='description'
            placeholder='Comment'
            rows='5'
            ref={register({
              required: 'Comment required'
            })}
          />
        </div>
        {errors.comment && (
          <p style={{ color: 'red' }}>{errors.comment.message}</p>
        )}
        <button className='add-btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}
