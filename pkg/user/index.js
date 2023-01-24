const mongoose = require('mongoose');

const User = mongoose.model(
   'user',
   {
      image_url: {
         type: String
      },
      first_name: {
         type: String,
         required: true
      },
      last_name: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      birthday: {
         type: Date,
         required: true
      },
      password: {
         type: String,
         required: true
      },
      created_on: {
         type: Date,
         required: true
      }
   }
);

const create = async (data) => {
   let u = new User(data);
   return u.save();
};

const getUserByEmail = async (email) => {
   return User.findOne({ email });
}
   ;
const get = async (uid) => {
   return User.findOne({ _id: uid });
};

const update = async (uid, data) => {
   return User.updateOne({ _id: uid }, data);
};

const remove = async (id) => {
   return User.remove({ _id: id });
};

module.exports = {
   create,
   getUserByEmail,
   get,
   update,
   remove
};
