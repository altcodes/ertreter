import React, { createContext, useState, useEffect } from 'react';
import fire from '../firebase';
import * as userService from '../services/UserService';

export const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email } = user;
        if (email) {
          userService.get(email).then((res) => {
            setCurrentUser(res);
          });
        }
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
