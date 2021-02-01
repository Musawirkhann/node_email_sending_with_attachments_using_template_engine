'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {emailView, sendEmail} = require('../controllers/emailController');

const router = express.Router();

router.get('/', emailView);
router.post('/sendemail', upload.array('files'), sendEmail);


module.exports = {
    routes: router
}