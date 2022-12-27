const mongoose = require('mongoose');

const Recipe = mongoose.model(
   'recipe',
   {
      // image_url: {
      //    type: String,
      //    required: true
      // },
      author_id: {
         type: String,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      category: {
         type: String,
         required: true
      },
      preparation_time: {
         type: Number,
         required: true
      },
      number_persons: {
         type: Number,
         required: true
      },
      short_description: {
         type: String,
         required: true
      },
      long_description: {
         type: String,
         required: true
      },
      likes: {
         type: Number,
         required: true
      },
      created_on: {
         type: Date,
         required: true
      },
      last_updated: {
         type: Date,
         required: true
      }
   }
);

const create = async (data) => {
   const r = new Recipe(data);
   return r.save();
};

const update = async (id, uid, data) => {
   return Recipe.updateOne({ _id: id, author_id: uid }, data);
};

const getAll = async () => {
   return Recipe.find({});
};

const getById = async (id) => {
   return Recipe.findOne({ _id: id });
};

const getUserRecipes = async (uid) => {
   return Recipe.find({ author_id: uid });
};

const getCategory = async (name) => {
   return Recipe.find({ category: name });
};

const remove = async (id, uid) => {
   return Recipe.deleteOne({ _id: id, author_id: uid });
};

module.exports = {
   getAll,
   getById,
   getUserRecipes,
   getCategory,
   create,
   update,
   remove
};