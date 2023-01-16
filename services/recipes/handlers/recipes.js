const recipes = require('../../../pkg/recipe');

const createRecipe = async (req, res) => {
   try {
      let payload = {
         ...req.body,
         author_id: req.auth.uid,
         created_on: new Date(),
         last_updated: new Date(),
         likes: 0
      };
      let recipe = await recipes.create(payload);
      return res.status(201).send(recipe);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};

const getAll = async (req, res) => {
   try {
      let r = await recipes.getAll();
      if (r.length === 0) {
         return res.status(404).send('There are no recipes');
      }
      return res.status(200).send(r);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};
const getMyRecipes = async (req, res) => {
   try {
      let r = await recipes.getUserRecipes(req.auth.uid);
      if (r.length === 0) {
         return res.status(404).send('There are no recipes');
      }
      return res.status(200).send(r);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};

const getRecipe = async (req, res) => {
   try {
      let r = await recipes.getById(req.params.id);
      if (r.length === 0) {
         return res.status(404).send('There are no recipes');
      }
      res.status(200).send(r);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};

const getByCategory = async (req, res) => {
   try {
      let r = await recipes.getCategory(req.params.category);
      if (r.length === null) {
         return res.status(404).send('There are no recipes');
      }
      res.status(200).send(r);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};

const update = async (req, res) => {
   try {
      let payload = {
         ...req.body,
         last_updated: new Date()
      };
      let r = await recipes.update(req.params.id, req.auth.uid, payload);
      if (r.modifiedCount < 1) {
         return res.status(409).send('Recipe not found');
      }
      return res.status(200).send(payload);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};

const remove = async (req, res) => {
   try {
      await recipes.remove(req.params.id, req.auth.uid);
      if (recipes.deletedCount === 0) {
         return res.status(400).send({
            message: 'Bad request'
         });
      }
      return res.status(200).send(req.params.id);
   } catch (err) {
      console.log(err);
      return res.status(500).send('ISE!');
   }
};

module.exports = {
   createRecipe,
   getAll,
   getMyRecipes,
   getByCategory,
   getRecipe,
   update,
   remove
};