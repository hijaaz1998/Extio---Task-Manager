const express = require('express');
const roleController = require('../controller/roleController')

const roleRouter = express.Router();

roleRouter.route('/role')
    .get(roleController.getRoles)
    .post(roleController.addRole)
    .put(roleController.editRole)

roleRouter.route('/role/:id')
    .put(roleController.editRole)
    .delete(roleController.deleteRole)

module.exports = roleRouter;
