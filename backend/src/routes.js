const express = require('express');

const UsersProfileController = require('./app/controllers/UsersProfileController');
const AuthController = require('./app/controllers/AuthController');

const routes = express.Router();

routes.post('/profile', UsersProfileController.store);
routes.get('/profile', UsersProfileController.index);
routes.get('/profile/my', UsersProfileController.indexone);
routes.post('/profile/update', UsersProfileController.update);

routes.post('/account/create', AuthController.store);

module.exports = routes;
