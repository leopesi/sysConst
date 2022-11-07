const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes')

router.use('/user', userRoutes, authRoutes);

module.exports = router;