import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import fire from '../firebase';
import * as userService from '../services/UserService';
import '../styles/auth.css';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log('cu', currentUser);
  const {
    register: signin,
    handleSubmit: handleSignin,
    errors: signinErrors
  } = useForm();
  const {
    register: signup,
    handleSubmit: handleSignup,
    errors: signupErrors
  } = useForm();

  const [login, setLogin] = useState(true);
  const [errorLogin, setErrorLogin] = useState('');

  const signIn = (data) => {
    const { email, password } = data;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        userService
          .get(email)
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
            setCurrentUser(null);
          });
      })
      .catch((err) => {
        setErrorLogin(err);
      });
  };
  const signUp = (data) => {
    const { email, password } = data;
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        delete data.password;
        userService
          .post(data)
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
            setCurrentUser(null);
          });
      });
  };

  const textStyle = {
    color: 'blue',
    cursor: 'pointer'
  };

  if (currentUser) {
    return <Redirect to='/home' />;
  } else {
    return currentUser !== null ? (
      <p style={{ fontSize: '24px' }}>Loading... </p>
    ) : (
      <div className='login'>
        {login ? (
          <form onSubmit={handleSignin(signIn)}>
            <h3 className='type'>Sign In</h3>
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                ref={signin({
                  required: 'Email required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid format'
                  }
                })}
              />
            </div>
            {signinErrors.email && (
              <p style={{ color: 'red' }}>{signinErrors.email.message}</p>
            )}
            <div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                ref={signin({
                  required: 'Password required',
                  minLength: { value: 6, message: 'Minimum 6 letters required' }
                })}
              />
            </div>
            {signinErrors.password && (
              <p style={{ color: 'red' }}>{signinErrors.password.message}</p>
            )}
            <button type='submit'>Submit</button>
            {errorLogin && (
              <p style={{ color: 'red' }}>Invalid email and password</p>
            )}
            <p className='text-right'>
              New registration{' '}
              <u style={textStyle} onClick={() => setLogin(false)}>
                Sign up?
              </u>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup(signUp)}>
            <h3 className='type'>Sign Up</h3>

            <div>
              <input
                type='text'
                name='firstname'
                placeholder='First name'
                ref={signup({
                  required: 'Firstname required'
                })}
              />
            </div>
            {signupErrors.firstname && (
              <p style={{ color: 'red' }}>{signupErrors.firstname.message}</p>
            )}
            <div>
              <input
                type='text'
                name='lastname'
                placeholder='Last name'
                ref={signup({
                  required: 'Lastname required'
                })}
              />
            </div>

            {signupErrors.firstname && (
              <p style={{ color: 'red' }}>{signupErrors.firstname.message}</p>
            )}
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                ref={signup({
                  required: 'Email required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid format'
                  }
                })}
              />
            </div>
            {signupErrors.email && (
              <p style={{ color: 'red' }}>{signupErrors.email.message}</p>
            )}
            <div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                ref={signup({
                  required: 'Password required',
                  minLength: { value: 6, message: 'Minimum 6 letters required' }
                })}
              />
            </div>
            {signupErrors.password && (
              <p style={{ color: 'red' }}>{signupErrors.password.message}</p>
            )}
            <button type='submit'>Submit</button>
            <p className='text-right'>
              Already registered{' '}
              <u style={textStyle} onClick={() => setLogin(true)}>
                Sign in?
              </u>
            </p>
          </form>
        )}
      </div>
    );
  }
}
