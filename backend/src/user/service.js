const User = require('./model');

function getUser(id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    User.find({})
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createUser(params) {
  return new Promise((resolve, reject) => {
    User.find({ email: params.email }).then((user) => {
      console.log('user', user);
      if (user.length > 0) {
        reject('user already exist');
      } else {
        const newUser = new User(params);
        newUser
          .save()
          .then((res) => {
            resolve({ user: res });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    getUser(id).then((user) => {
      if (user) {
        User.deleteOne({ _id: id }).then((res) => {
          resolve(res);
        });
      } else {
        reject('user not exist');
      }
    });
  });
}

function updateUser(id, params) {
  return new Promise((resolve, reject) => {
    getUser(id).then((user) => {
      if (user) {
        User.updateOne({ _id: id }, params).then((res) => {
          resolve(res);
        });
      } else {
        reject('user not exist');
      }
    });
  });
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser
};
