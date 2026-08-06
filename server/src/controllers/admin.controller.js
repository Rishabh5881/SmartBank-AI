const adminService = require("../services/admin.service");

// =====================================
// ADMIN OVERVIEW
// =====================================

async function getAdminOverviewController(
  req,
  res,
  next
) {
  try {
    const overview =
      await adminService.getAdminOverview();

    res.status(200).json({
      success: true,
      message: "Admin overview fetched successfully",
      data: overview,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================
// ADMIN CUSTOMERS
// =====================================

async function getAdminCustomersController(
  req,
  res,
  next
) {
  try {
    const {
      search = "",
      limit = 20,
      offset = 0,
    } = req.query;

    const result =
      await adminService.getCustomers({
        search,
        limit,
        offset,
      });

    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: result.customers,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================
// ADMIN RECENT ACTIVITY
// =====================================

async function getAdminActivityController(
  req,
  res,
  next
) {
  try {
    const {
      limit = 10,
    } = req.query;

    const activities =
      await adminService.getRecentActivity({
        limit,
      });

    res.status(200).json({
      success: true,
      message: "Admin activity fetched successfully",
      data: activities,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================
// ADMIN CUSTOMER DETAILS
// =====================================

async function getAdminCustomerController(
  req,
  res,
  next
) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }

    const customer =
      await adminService.getCustomerById(
        userId
      );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer details fetched successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================
// EXPORTS
// =====================================

module.exports = {
  getAdminOverviewController,
  getAdminCustomersController,
  getAdminActivityController,
  getAdminCustomerController,
};