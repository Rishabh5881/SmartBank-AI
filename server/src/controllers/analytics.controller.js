const analyticsService = require('../services/analytics.service');

// GET /api/v1/analytics/spending
async function getSpendingAnalyticsController(req, res, next) {
  try {
    const analytics = await analyticsService.getSpendingAnalytics(req.user.id);

    return res.status(200).json({
      success: true,
      message: 'Spending analytics fetched successfully',
      data: analytics,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSpendingAnalyticsController,
};