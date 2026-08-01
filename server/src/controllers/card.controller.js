
const cardService = require("../services/card.service");

// =====================================================
// GET ALL CARDS
// GET /api/cards
// =====================================================

async function getCards(req, res, next) {
  try {
    const userId = req.user.id;

    const cards = await cardService.getUserCards(userId);

    return res.status(200).json({
      success: true,
      message: "Cards fetched successfully",
      data: cards,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// GET SINGLE CARD
// GET /api/cards/:id
// =====================================================

async function getCardById(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const card = await cardService.getCardById(
      userId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Card fetched successfully",
      data: card,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// CREATE CARD
// POST /api/cards
// =====================================================

async function createCard(req, res, next) {
  try {
    const userId = req.user.id;

    const card = await cardService.createCard(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Card created successfully",
      data: card,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// UPDATE CARD
// PATCH /api/cards/:id
// =====================================================

async function updateCard(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const card = await cardService.updateCard(
      userId,
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Card updated successfully",
      data: card,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// FREEZE / UNFREEZE CARD
// PATCH /api/cards/:id/freeze
// =====================================================

async function freezeCard(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const card = await cardService.toggleFreezeCard(
      userId,
      id
    );

    return res.status(200).json({
      success: true,
      message: card.frozen
        ? "Card frozen successfully"
        : "Card unfrozen successfully",
      data: card,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// DELETE CARD
// DELETE /api/cards/:id
// =====================================================

async function deleteCard(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await cardService.deleteCard(
      userId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Card deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// GET CARD SUMMARY
// GET /api/cards/summary
// =====================================================

async function getCardSummary(req, res, next) {
  try {
    const userId = req.user.id;

    const summary = await cardService.getCardSummary(
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Card summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getCards,
  getCardById,
  createCard,
  updateCard,
  freezeCard,
  deleteCard,
  getCardSummary,
};

