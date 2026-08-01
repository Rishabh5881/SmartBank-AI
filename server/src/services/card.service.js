const crypto = require("crypto");

const prisma = require("../config/prisma");

// =====================================================
// CONSTANTS
// =====================================================

const ALLOWED_CARD_TYPES = [
"Debit Card",
"Credit Card",
"Platinum Card",
];

const ALLOWED_VALIDITY = [
"3 Years",
"5 Years",
"7 Years",
];

const DEFAULT_VALIDITY = "5 Years";

// =====================================================
// GET ALL CARDS
// GET /api/cards
// =====================================================

async function getUserCards(userId) {
requireUser(userId);

const cards = await prisma.card.findMany({
where: {
userId,
},
orderBy: {
createdAt: "desc",
},
});

return cards;
}

// =====================================================
// GET SINGLE CARD
// GET /api/cards/:id
// =====================================================

async function getCardById(userId, cardId) {
requireUser(userId);

if (!cardId) {
throw createError("Card ID is required", 400);
}

const card = await prisma.card.findFirst({
where: {
id: cardId,
userId,
},
});

if (!card) {
throw createError("Card not found", 404);
}

return card;
}

// =====================================================
// CREATE CARD
// POST /api/cards
// =====================================================

async function createCard(userId, data = {}) {
requireUser(userId);

const {
type,
limit,
validity,
interest,
holder,
} = data;

// ===================================================
// CARD TYPE
// ===================================================

if (!type) {
throw createError(
"Card type is required",
400
);
}

if (!ALLOWED_CARD_TYPES.includes(type)) {
throw createError(
`Invalid card type. Allowed types: ${ALLOWED_CARD_TYPES.join(
        ", "
      )}`,
400
);
}

// ===================================================
// LIMIT
// ===================================================

const numericLimit = parseNumericValue(
limit,
"Card limit"
);

if (numericLimit < 0) {
throw createError(
"Card limit must be a valid non-negative number",
400
);
}

// ===================================================
// INTEREST
// ===================================================

const numericInterest = parseNumericValue(
interest,
"Interest rate"
);

if (
numericInterest < 0 ||
numericInterest > 100
) {
throw createError(
"Interest rate must be between 0 and 100",
400
);
}

// ===================================================
// VALIDITY
// ===================================================

const selectedValidity =
validity || DEFAULT_VALIDITY;

if (
!ALLOWED_VALIDITY.includes(
selectedValidity
)
) {
throw createError(
`Invalid card validity. Allowed values: ${ALLOWED_VALIDITY.join(
        ", "
      )}`,
400
);
}

// ===================================================
// HOLDER
// ===================================================

const cardHolder =
typeof holder === "string" &&
holder.trim().length > 0
? holder.trim().toUpperCase()
: "SMARTBANK USER";

// ===================================================
// CREATE
// ===================================================

const card = await prisma.card.create({
data: {
userId,


  type,

  number: generateCardNumber(),

  holder: cardHolder,

  expiry: generateExpiry(
    selectedValidity
  ),

  limit: numericLimit,

  validity: selectedValidity,

  interest: numericInterest,

  frozen: false,
},


});

return card;
}

// =====================================================
// UPDATE CARD
// PATCH /api/cards/:id
// =====================================================

async function updateCard(
userId,
cardId,
data = {}
) {
const existingCard = await getCardById(
userId,
cardId
);

const updateData = {};

// ===================================================
// CARD TYPE
// ===================================================

if (data.type !== undefined) {
if (
!ALLOWED_CARD_TYPES.includes(
data.type
)
) {
throw createError(
`Invalid card type. Allowed types: ${ALLOWED_CARD_TYPES.join(
          ", "
        )}`,
400
);
}

```
updateData.type = data.type;
```

}

// ===================================================
// LIMIT
// ===================================================

if (data.limit !== undefined) {
const numericLimit =
parseNumericValue(
data.limit,
"Card limit"
);

```
if (numericLimit < 0) {
  throw createError(
    "Card limit must be a valid non-negative number",
    400
  );
}

updateData.limit = numericLimit;
```

}

// ===================================================
// VALIDITY
// ===================================================

if (data.validity !== undefined) {
if (
!ALLOWED_VALIDITY.includes(
data.validity
)
) {
throw createError(
`Invalid card validity. Allowed values: ${ALLOWED_VALIDITY.join(
          ", "
        )}`,
400
);
}

updateData.validity =
  data.validity;

updateData.expiry =
  generateExpiry(data.validity);


}

// ===================================================
// INTEREST
// ===================================================

if (data.interest !== undefined) {
const numericInterest =
parseNumericValue(
data.interest,
"Interest rate"
);

if (
  numericInterest < 0 ||
  numericInterest > 100
) {
  throw createError(
    "Interest rate must be between 0 and 100",
    400
  );
}

updateData.interest =
  numericInterest;


}

// ===================================================
// HOLDER
// ===================================================

if (data.holder !== undefined) {
if (
typeof data.holder !== "string" ||
!data.holder.trim()
) {
throw createError(
"Card holder name must be valid",
400
);
}


updateData.holder =
  data.holder
    .trim()
    .toUpperCase();


}

// ===================================================
// NO VALID FIELDS
// ===================================================

if (
Object.keys(updateData).length === 0
) {
throw createError(
"No valid card fields provided for update",
400
);
}

// ===================================================
// UPDATE
// ===================================================

const updatedCard =
await prisma.card.update({
where: {
id: existingCard.id,
},
data: updateData,
});

return updatedCard;
}

// =====================================================
// FREEZE / UNFREEZE CARD
// PATCH /api/cards/:id/freeze
// =====================================================

async function toggleFreezeCard(
userId,
cardId
) {
const existingCard =
await getCardById(
userId,
cardId
);

const updatedCard =
await prisma.card.update({
where: {
id: existingCard.id,
},
data: {
frozen: !existingCard.frozen,
},
});

return updatedCard;
}

// =====================================================
// DELETE CARD
// DELETE /api/cards/:id
// =====================================================

async function deleteCard(
userId,
cardId
) {
const existingCard =
await getCardById(
userId,
cardId
);

await prisma.card.delete({
where: {
id: existingCard.id,
},
});

return {
id: existingCard.id,
message: "Card deleted successfully",
};
}

// =====================================================
// CARD SUMMARY
// GET /api/cards/summary
// =====================================================

async function getCardSummary(userId) {
requireUser(userId);

const cards =
await prisma.card.findMany({
where: {
userId,
},
});

const activeCards =
cards.filter(
(card) => !card.frozen
);

const frozenCards =
cards.filter(
(card) => card.frozen
);

const creditCards =
cards.filter(
(card) =>
card.type === "Credit Card"
);

const debitCards =
cards.filter(
(card) =>
card.type === "Debit Card"
);

const platinumCards =
cards.filter(
(card) =>
card.type === "Platinum Card"
);

const totalLimit =
cards.reduce(
(total, card) =>
total +
Number(card.limit || 0),
0
);

const totalInterest =
cards.reduce(
(total, card) =>
total +
Number(card.interest || 0),
0
);

return {
totalCards: cards.length,


activeCards:
  activeCards.length,

frozenCards:
  frozenCards.length,

creditCards:
  creditCards.length,

debitCards:
  debitCards.length,

platinumCards:
  platinumCards.length,

totalLimit,

totalInterest,


};
}

// =====================================================
// PARSE NUMERIC VALUES
// =====================================================
// Supports:
// 25000
// "25000"
// "$25,000"
// "₹25,000"
// "25,000"
// "12%"
// =====================================================

function parseNumericValue(
value,
fieldName
) {
if (
value === undefined ||
value === null ||
value === ""
) {
return 0;
}

let normalizedValue = value;

if (
typeof normalizedValue === "string"
) {
normalizedValue =
normalizedValue
.replace(/[$₹,\s%]/g, "")
.trim();
}

const numericValue =
Number(normalizedValue);

if (
!Number.isFinite(numericValue)
) {
throw createError(
`${fieldName} must be a valid number`,
400
);
}

return numericValue;
}

// =====================================================
// GENERATE MASKED CARD NUMBER
// =====================================================

function generateCardNumber() {
const first = crypto.randomInt(
1000,
10000
);

const last = crypto.randomInt(
1000,
10000
);

return `${first} **** **** ${last}`;
}

// =====================================================
// GENERATE EXPIRY
// =====================================================

function generateExpiry(validity) {
const currentYear =
new Date().getFullYear();

let years = 5;

if (validity === "3 Years") {
years = 3;
} else if (
validity === "5 Years"
) {
years = 5;
} else if (
validity === "7 Years"
) {
years = 7;
}

return `12/${String(
    currentYear + years
  ).slice(-2)}`;
}

// =====================================================
// AUTH VALIDATION
// =====================================================

function requireUser(userId) {
if (!userId) {
throw createError(
"User authentication required",
401
);
}
}

// =====================================================
// ERROR FACTORY
// =====================================================

function createError(
message,
statusCode
) {
const error = new Error(message);

error.statusCode = statusCode;

return error;
}

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
getUserCards,
getCardById,
createCard,
updateCard,
toggleFreezeCard,
deleteCard,
getCardSummary,
};
