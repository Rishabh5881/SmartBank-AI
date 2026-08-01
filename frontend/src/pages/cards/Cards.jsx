import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  CreditCard,
  TrendingUp,
  Plus,
  ShieldCheck,
  Activity,
  WalletCards,
  ArrowUpRight,
  Snowflake,
  CheckCircle2,
  Eye,
  EyeOff,
  ChevronRight,
  MoreHorizontal,
  Sparkles,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import BankCard from "../../components/cards/BankCard";
import CardDetails from "../../components/cards/CardDetails";
import AddCardModal from "../../components/cards/AddCardModal";

import api from "../../api/axios";

const Cards = () => {
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showLimits, setShowLimits] = useState(true);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // NORMALIZE CARD DATA
  // =====================================================

  const normalizeCard = useCallback((card) => {
    if (!card) {
      return null;
    }

    return {
      ...card,

      id: card.id,

      type: card.type || "Debit Card",

      number:
        card.number ||
        "**** **** **** ****",

      holder:
        card.holder ||
        "SMARTBANK USER",

      expiry:
        card.expiry ||
        "N/A",

      limit:
        card.limit !== undefined &&
        card.limit !== null
          ? String(card.limit)
          : "$0",

      validity:
        card.validity ||
        "5 Years",

      interest:
        card.interest !== undefined &&
        card.interest !== null
          ? String(card.interest)
          : "0%",

      frozen:
        Boolean(card.frozen),

      color:
        card.color ||
        (
          card.type === "Platinum Card"
            ? "from-blue-600 to-cyan-400"
            : card.type === "Credit Card"
            ? "from-purple-600 to-indigo-600"
            : "from-emerald-500 to-green-600"
        ),
    };
  }, []);

  // =====================================================
  // FETCH CARDS
  // GET /api/cards
  // =====================================================

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/cards");

      const responseData = response?.data?.data;

      const fetchedCards = Array.isArray(responseData)
        ? responseData
        : [];

      setCards(
        fetchedCards
          .map(normalizeCard)
          .filter(Boolean)
      );
    } catch (err) {
      console.error("Fetch cards error:", err);

      const message =
        err?.response?.data?.message ||
        "Unable to load your cards. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [normalizeCard]);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // =====================================================
  // ACTIVE CARDS
  // =====================================================

  const activeCards = useMemo(
    () =>
      cards.filter(
        (card) => !card.frozen
      ),
    [cards]
  );

  // =====================================================
  // FROZEN CARDS
  // =====================================================

  const frozenCards = useMemo(
    () =>
      cards.filter(
        (card) => card.frozen
      ),
    [cards]
  );

  // =====================================================
  // TOTAL CARD LIMIT
  // =====================================================

  const totalLimit = useMemo(() => {
    return cards.reduce(
      (total, card) => {
        const numericLimit = Number(
          String(card.limit || "0").replace(
            /[$₹,\s]/g,
            ""
          )
        );

        return (
          total +
          (Number.isFinite(numericLimit)
            ? numericLimit
            : 0)
        );
      },
      0
    );
  }, [cards]);

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (value) => {
    return `$${Number(value || 0).toLocaleString(
      "en-US"
    )}`;
  };

  // =====================================================
  // CREATE CARD
  // POST /api/cards
  // =====================================================

  const createCard = async (data) => {
    try {
      setActionLoading(true);
      setError("");

      const payload = {
        type: data.type,
        limit: data.limit,
        validity: data.validity,
        interest: data.interest,
      };

      const response = await api.post(
        "/cards",
        payload
      );

      const createdCard =
        response?.data?.data;

      if (!createdCard) {
        throw new Error(
          "Card creation response was invalid."
        );
      }

      const normalizedCard =
        normalizeCard(createdCard);

      setCards((prev) => [
        ...prev,
        normalizedCard,
      ]);

      setShowAddModal(false);
    } catch (err) {
      console.error("Create card error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to create card. Please try again.";

      setError(message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // DELETE CARD
  // DELETE /api/cards/:id
  // =====================================================

  const deleteCard = async (card) => {
    if (!card?.id) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await api.delete(
        `/cards/${card.id}`
      );

      setCards((prev) =>
        prev.filter(
          (item) =>
            item.id !== card.id
        )
      );

      setSelectedCard(null);
    } catch (err) {
      console.error("Delete card error:", err);

      const message =
        err?.response?.data?.message ||
        "Unable to delete card. Please try again.";

      setError(message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // FREEZE / UNFREEZE CARD
  // PATCH /api/cards/:id/freeze
  // =====================================================

  const freezeCard = async (card) => {
    if (!card?.id) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      const response = await api.patch(
        `/cards/${card.id}/freeze`
      );

      const updatedCard =
        response?.data?.data;

      if (updatedCard) {
        const normalizedCard =
          normalizeCard(updatedCard);

        setCards((prev) =>
          prev.map((item) =>
            item.id === card.id
              ? normalizedCard
              : item
          )
        );
      } else {
        setCards((prev) =>
          prev.map((item) =>
            item.id === card.id
              ? {
                  ...item,
                  frozen: !item.frozen,
                }
              : item
          )
        );
      }

      setSelectedCard(null);
    } catch (err) {
      console.error(
        "Freeze/unfreeze card error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        "Unable to update card status. Please try again.";

      setError(message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // RETRY
  // =====================================================

  const handleRetry = () => {
    fetchCards();
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 pt-28 text-white">
        <div className="pointer-events-none absolute left-0 top-20 h-[360px] w-[360px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

        <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06]">
            <Loader2
              size={28}
              className="animate-spin text-cyan-400"
            />
          </div>

          <p className="mt-5 text-sm font-semibold text-white">
            Loading your cards
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Securing your card portfolio...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 pb-16 pt-28 text-white sm:px-6 lg:px-10">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed left-0 top-20 -z-0 h-[360px] w-[360px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

      <div className="pointer-events-none fixed bottom-0 right-0 -z-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1550px]">
        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-400/10">
                <AlertCircle
                  size={17}
                  className="text-red-400"
                />
              </div>

              <p className="text-xs font-medium text-red-300">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRetry}
              className="flex w-fit items-center gap-2 rounded-xl border border-red-400/10 bg-red-400/[0.05] px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
            >
              <RefreshCw size={13} />

              Retry
            </button>
          </motion.div>
        )}

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
              <WalletCards
                size={13}
                className="text-cyan-400"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Card Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px]">
              My Cards
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Manage your debit and credit cards,
              monitor limits, and keep every payment
              method secure from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 backdrop-blur-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <ShieldCheck size={17} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                  Security
                </p>

                <p className="mt-0.5 text-sm font-semibold text-slate-200">
                  Protected
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={actionLoading}
              onClick={() =>
                setShowAddModal(true)
              }
              className="group flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus
                size={17}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add Card
            </button>
          </div>
        </motion.div>

        {/* =====================================================
            OVERVIEW
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 22,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
          className="mt-9 grid gap-5 xl:grid-cols-[1.5fr_1fr_1fr]"
        >
          {/* MAIN CARD OVERVIEW */}

          <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 p-6 shadow-2xl shadow-blue-950/30 sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute bottom-[-100px] left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CreditCard size={17} />

                    <span className="text-sm font-medium">
                      Card Portfolio
                    </span>
                  </div>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    {cards.length}
                  </h2>

                  <p className="mt-1 text-xs text-white/60">
                    Total cards linked to your profile
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                  <Sparkles size={21} />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                    Active
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {activeCards.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                    Frozen
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {frozenCards.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AVAILABLE LIMIT */}

          <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                <TrendingUp size={20} />
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowLimits(
                    (value) => !value
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                aria-label={
                  showLimits
                    ? "Hide card limits"
                    : "Show card limits"
                }
              >
                {showLimits ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>

            <p className="mt-6 text-xs font-medium text-slate-500">
              Total Card Limit
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {showLimits
                ? formatCurrency(totalLimit)
                : "••••••••"}
            </h2>

            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400">
              <ArrowUpRight size={14} />

              <span>
                Available across all cards
              </span>
            </div>
          </div>

          {/* CARD STATUS */}

          <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                <Activity size={20} />
              </div>

              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                Secure
              </span>
            </div>

            <p className="mt-6 text-xs font-medium text-slate-500">
              Card Status
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              {frozenCards.length > 0
                ? "Attention"
                : "All Active"}
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              {frozenCards.length > 0
                ? `${frozenCards.length} card${
                    frozenCards.length > 1
                      ? "s are"
                      : " is"
                  } currently frozen.`
                : "Your cards are ready for secure payments."}
            </p>
          </div>
        </motion.section>

        {/* =====================================================
            MINI METRICS
        ===================================================== */}

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Active Cards",
              value: activeCards.length,
              change: "Ready to use",
              icon: CheckCircle2,
              iconBg: "bg-emerald-400/10",
              iconColor: "text-emerald-400",
            },
            {
              label: "Frozen Cards",
              value: frozenCards.length,
              change: "Security control",
              icon: Snowflake,
              iconBg: "bg-blue-400/10",
              iconColor: "text-blue-400",
            },
            {
              label: "Credit Cards",
              value: cards.filter(
                (card) =>
                  card.type === "Credit Card"
              ).length,
              change: "Credit facility",
              icon: CreditCard,
              iconBg: "bg-purple-400/10",
              iconColor: "text-purple-400",
            },
            {
              label: "Debit Cards",
              value: cards.filter(
                (card) =>
                  card.type === "Debit Card"
              ).length,
              change: "Direct access",
              icon: WalletCards,
              iconBg: "bg-cyan-400/10",
              iconColor: "text-cyan-400",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    0.15 + index * 0.05,
                }}
                whileHover={{
                  y: -3,
                }}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon
                      size={18}
                      className={
                        item.iconColor
                      }
                    />
                  </div>

                  <span className="text-[10px] font-medium text-slate-600">
                    {item.change}
                  </span>
                </div>

                <p className="mt-5 text-xs font-medium text-slate-500">
                  {item.label}
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* =====================================================
            CARDS HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Your wallet
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your Cards
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a card to view details and security controls.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />

            <span className="text-xs font-semibold text-slate-400">
              {activeCards.length} Active
            </span>
          </div>
        </motion.div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {cards.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-6 rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-10 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
              <WalletCards size={28} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              No cards yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You don't have any cards linked to your
              account. Add your first SmartBank card
              to get started.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowAddModal(true)
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              <Plus size={16} />

              Add Your First Card
            </button>
          </motion.div>
        )}

        {/* =====================================================
            CARD GRID
        ===================================================== */}

        {cards.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="relative"
                >
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          card.frozen
                            ? "bg-blue-400"
                            : "bg-emerald-400"
                        }`}
                      />

                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                        {card.frozen
                          ? "Frozen"
                          : "Active"}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() =>
                        setSelectedCard(card)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-600 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Card options"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <BankCard
                    {...card}
                    onClick={() =>
                      setSelectedCard(card)
                    }
                  />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-700">
                        Limit
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-300">
                        {showLimits
                          ? card.limit
                          : "••••••"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-700">
                        Interest
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-300">
                        {card.interest}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* =====================================================
            SECURITY BANNER
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-10 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                <ShieldCheck
                  size={20}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Your cards are protected
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  SmartBank AI monitors card activity
                  and helps protect your payment
                  methods from suspicious behavior.
                </p>
              </div>
            </div>

            <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              Protected
            </span>
          </div>
        </motion.section>

        {/* =====================================================
            CARD SECURITY FEATURES
        ===================================================== */}

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Smart controls
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Card Security
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Snowflake,
                title: "Freeze Instantly",
                description:
                  "Temporarily freeze a card whenever you need additional protection.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                description:
                  "Your payment methods are monitored for unusual activity.",
              },
              {
                icon: Activity,
                title: "Activity Monitoring",
                description:
                  "Keep track of card usage and payment behavior in one place.",
              },
            ].map(
              (feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-5 text-sm font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {feature.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold text-slate-700 transition group-hover:text-cyan-400">
                      SmartBank Protection

                      <ChevronRight size={12} />
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </section>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Add New Card",
              description:
                "Create another payment card",
              icon: Plus,
              action: () =>
                setShowAddModal(true),
            },
            {
              title: "Card Security",
              description:
                "Review card protection settings",
              icon: ShieldCheck,
              action: () => {},
            },
            {
              title: "View Transactions",
              description:
                "Review card payment activity",
              icon: Activity,
              action: () => {},
            },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                onClick={action.action}
                disabled={actionLoading}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/15 hover:bg-cyan-400/[0.035] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-slate-400 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-400">
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {action.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="ml-auto text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-400"
                />
              </button>
            );
          })}
        </section>
      </div>

      {/* =====================================================
          CARD DETAILS MODAL
      ===================================================== */}

      <CardDetails
        card={selectedCard}
        close={() =>
          setSelectedCard(null)
        }
        onDelete={deleteCard}
        onFreeze={freezeCard}
      />

      {/* =====================================================
          ADD CARD MODAL
      ===================================================== */}

      <AddCardModal
        open={showAddModal}
        close={() =>
          setShowAddModal(false)
        }
        createCard={createCard}
      />

      {/* =====================================================
          GLOBAL ACTION LOADER
      ===================================================== */}

      <AnimatePresence>
        {actionLoading && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl"
          >
            <Loader2
              size={16}
              className="animate-spin text-cyan-400"
            />

            <span className="text-xs font-semibold text-slate-300">
              Updating card...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cards;