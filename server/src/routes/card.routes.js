const express = require("express");

const {
  getCards,
  getCardById,
  createCard,
  updateCard,
  freezeCard,
  deleteCard,
  getCardSummary,
} = require("../controllers/card.controller");

const {
  authenticate,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// =====================================================
// ALL CARD ROUTES REQUIRE AUTHENTICATION
// =====================================================

router.use(authenticate);

// =====================================================
// GET ALL CARDS
// GET /api/cards
// =====================================================

router.get("/", getCards);

// =====================================================
// GET CARD SUMMARY
// GET /api/cards/summary
// IMPORTANT: Must be before /:id
// =====================================================

router.get("/summary", getCardSummary);

// =====================================================
// GET SINGLE CARD
// GET /api/cards/:id
// =====================================================

router.get("/:id", getCardById);

// =====================================================
// CREATE CARD
// POST /api/cards
// =====================================================

router.post("/", createCard);

// =====================================================
// UPDATE CARD
// PATCH /api/cards/:id
// =====================================================

router.patch("/:id", updateCard);

// =====================================================
// FREEZE / UNFREEZE CARD
// PATCH /api/cards/:id/freeze
// =====================================================

router.patch("/:id/freeze", freezeCard);

// =====================================================
// DELETE CARD
// DELETE /api/cards/:id
// =====================================================

router.delete("/:id", deleteCard);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;