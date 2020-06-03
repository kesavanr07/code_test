const express = require('express');
const router  = express.Router();

const common = require('../lib/utils/common');
const users = require('../lib/controller/users');

router.post('/save', function(req, res) {
    users.saveUser(req, (err, data) => {
        common.handleResponse(err, data, res);
    });
});

router.post('/get', function(req, res) {
  users.getUsers(req, (err, data) => {
      common.handleResponse(err, data, res);
  });
});

module.exports = router;
