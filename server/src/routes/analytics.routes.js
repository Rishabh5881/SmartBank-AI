const express = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const { getSpendingAnalyticsController } = require('../controllers/analytics.controller');

const router = express.Router();

router.use(authenticate);

router.get('/spending', getSpendingAnalyticsController);

module.exports = router;