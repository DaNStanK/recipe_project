const config = require('../../pkg/config/index');
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const auth = require('./handlers/auth');
const db = require('../../pkg/db/index');

db.init();
const api = express();

api.use(express.json());

api.post('/api/v1/auth/create-account', auth.create);
api.post('/api/v1/auth/login', auth.login);

api.use(
   jwt({
      algorithms: ['HS256'],
      secret: config.get('security').jwt_secret
   }).unless({
      path: [
         '/api/v1/auth/create-account',
         '/api/v1/auth/login',
      ]
   })
);

api.get('/api/v1/auth/users', auth.getUser);
api.put('/api/v1/auth/update', auth.updateUser);
api.delete('/api/v1/auth/delete', auth.remove);

api.use((err, req, res, next) => {
   if (err.name === "UnauthorizedError") {
      res.status(401).send("Invalid token...");
   } else {
      next(err);
   }
});

api.listen(config.get('services').proxy.auth, err => {
   if (err) {
      return console.log(err);
   }
   console.log('Service [auth] successfully started on port', config.get('services').proxy.auth);
});