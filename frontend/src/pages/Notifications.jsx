import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CreditCard,
  Bell,
  ShieldCheck,
  Sparkles,
  CheckCheck,
  Clock3,
  Filter,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: CreditCard,
      title: "Transaction Alert",
      message: "Your payment of ₹250 was successful.",
      time: "Today, 10:30 AM",
      type: "Transaction",
      read: false,
    },
    {
      id: 2,
      icon: Bell,
      title: "Loan Update",
      message: "Your Home Loan EMI is due tomorrow.",
      time: "Yesterday",
      type: "Loan",
      read: false,
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Security Alert",
      message: "New login detected from Chrome on Windows.",
      time: "Today, 09:45 AM",
      type: "Security",
      read: false,
    },
    {
      id: 4,
      icon: Sparkles,
      title: "AI Financial Tip",
      message:
        "You can save ₹120/month by reducing unnecessary expenses.",
      time: "Today",
      type: "AI",
      read: true,
    },
  ]);

  const filters = [
    "All",
    "Transaction",
    "Loan",
    "Security",
    "AI",
  ];

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "All") {
      return notifications;
    }

    return notifications.filter(
      (item) => item.type === activeFilter
    );
  }, [activeFilter, notifications]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case "Transaction":
        return {
          icon:
            "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
          badge:
            "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
        };

      case "Loan":
        return {
          icon:
            "border-amber-400/15 bg-amber-400/10 text-amber-400",
          badge:
            "border-amber-400/15 bg-amber-400/10 text-amber-300",
        };

      case "Security":
        return {
          icon:
            "border-blue-400/15 bg-blue-400/10 text-blue-400",
          badge:
            "border-blue-400/15 bg-blue-400/10 text-blue-300",
        };

      case "AI":
        return {
          icon:
            "border-purple-400/15 bg-purple-400/10 text-purple-400",
          badge:
            "border-purple-400/15 bg-purple-400/10 text-purple-300",
        };

      default:
        return {
          icon:
            "border-cyan-400/15 bg-cyan-400/10 text-cyan-400",
          badge:
            "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Background Effects */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* =========================================
            HEADER
        ========================================= */}

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
            ease: "easeOut",
          }}
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-6
            shadow-2xl
            shadow-black/20
            backdrop-blur-2xl
            sm:p-8
          "
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-cyan-400/15
                  bg-cyan-400/[0.08]
                  text-cyan-400
                  shadow-lg
                  shadow-cyan-500/10
                "
              >
                <Bell
                  size={25}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1
                    className="
                      text-2xl
                      font-extrabold
                      tracking-tight
                      text-white
                      sm:text-3xl
                      lg:text-4xl
                    "
                  >
                    Notifications
                  </h1>

                  {unreadCount > 0 && (
                    <span
                      className="
                        rounded-full
                        border
                        border-cyan-400/15
                        bg-cyan-400/[0.08]
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-cyan-300
                      "
                    >
                      {unreadCount} unread
                    </span>
                  )}
                </div>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Stay updated with your banking activities,
                  security alerts, and AI-powered financial
                  recommendations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.04]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-slate-400
                transition-all
                duration-300
                hover:border-cyan-400/20
                hover:bg-cyan-400/[0.06]
                hover:text-cyan-400
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:w-fit
              "
            >
              <CheckCheck size={15} />

              Mark all as read
            </button>
          </div>

          {/* Stats */}

          <div className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Total
              </p>

              <p className="mt-1 text-xl font-bold text-white">
                {notifications.length}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
                Unread
              </p>

              <p className="mt-1 text-xl font-bold text-cyan-300">
                {unreadCount}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500/70">
                Read
              </p>

              <p className="mt-1 text-xl font-bold text-emerald-300">
                {notifications.length - unreadCount}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-400/10 bg-purple-400/[0.035] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/70">
                AI Alerts
              </p>

              <p className="mt-1 text-xl font-bold text-purple-300">
                {
                  notifications.filter(
                    (item) => item.type === "AI"
                  ).length
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            FILTER BAR
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.45,
          }}
          className="
            mt-6
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-4
            backdrop-blur-xl
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-2">
            <Filter
              size={15}
              className="text-slate-500"
            />

            <span className="text-xs font-semibold text-slate-500">
              Filter notifications
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`
                    rounded-xl
                    border
                    px-3.5
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/5"
                        : "border-white/[0.06] bg-white/[0.025] text-slate-500 hover:border-white/10 hover:bg-white/[0.05] hover:text-slate-300"
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* =========================================
            NOTIFICATION LIST
        ========================================= */}

        <div className="mt-6 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map(
              (item, index) => {
                const Icon = item.icon;
                const styles =
                  getTypeStyles(item.type);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.35,
                    }}
                    whileHover={{
                      y: -2,
                    }}
                    onClick={() =>
                      markAsRead(item.id)
                    }
                    className={`
                      group
                      relative
                      cursor-pointer
                      overflow-hidden
                      rounded-[24px]
                      border
                      p-4
                      shadow-xl
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      sm:p-5
                      ${
                        item.read
                          ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]"
                          : "border-cyan-400/[0.12] bg-cyan-400/[0.035] hover:border-cyan-400/20 hover:bg-cyan-400/[0.05]"
                      }
                    `}
                  >
                    {!item.read && (
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                    )}

                    <div className="flex items-start gap-4">
                      {/* ICON */}

                      <div
                        className={`
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          transition-transform
                          duration-300
                          group-hover:scale-105
                          ${styles.icon}
                        `}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2
                                className="
                                  text-sm
                                  font-bold
                                  text-white
                                  sm:text-base
                                "
                              >
                                {item.title}
                              </h2>

                              {!item.read && (
                                <span
                                  className="
                                    flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-cyan-400/10
                                    bg-cyan-400/[0.08]
                                    px-2
                                    py-0.5
                                    text-[8px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-cyan-300
                                  "
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                                  New
                                </span>
                              )}
                            </div>

                            <p
                              className="
                                mt-1.5
                                text-xs
                                leading-5
                                text-slate-500
                                sm:text-sm
                              "
                            >
                              {item.message}
                            </p>
                          </div>

                          <span
                            className={`
                              w-fit
                              shrink-0
                              rounded-full
                              border
                              px-2.5
                              py-1
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-wider
                              ${styles.badge}
                            `}
                          >
                            {item.type}
                          </span>
                        </div>

                        {/* META */}

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                            <Clock3 size={11} />

                            {item.time}
                          </div>

                          <span className="h-1 w-1 rounded-full bg-slate-700" />

                          <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                            <CheckCircle2 size={11} />

                            {item.read
                              ? "Read"
                              : "Unread"}
                          </div>
                        </div>
                      </div>

                      {/* ACTION */}

                      <div className="hidden shrink-0 items-center justify-center sm:flex">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            text-slate-600
                            transition-all
                            duration-300
                            group-hover:border-cyan-400/15
                            group-hover:bg-cyan-400/[0.06]
                            group-hover:text-cyan-400
                          "
                        >
                          <ArrowUpRight
                            size={15}
                            className="
                              transition-transform
                              duration-300
                              group-hover:-translate-y-0.5
                              group-hover:translate-x-0.5
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </AnimatePresence>

          {/* =========================================
              EMPTY STATE
          ========================================= */}

          {filteredNotifications.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-[28px]
                border
                border-dashed
                border-white/[0.08]
                bg-white/[0.025]
                px-6
                py-16
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.06]
                  text-cyan-400
                "
              >
                <Bell size={26} />
              </div>

              <h3 className="mt-5 text-base font-bold text-white">
                No notifications found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
                There are no notifications available
                for the selected category.
              </p>

              <button
                type="button"
                onClick={() =>
                  setActiveFilter("All")
                }
                className="
                  mt-5
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-400
                  transition
                  hover:border-cyan-400/20
                  hover:bg-cyan-400/[0.06]
                  hover:text-cyan-400
                "
              >
                View all notifications
              </button>
            </motion.div>
          )}
        </div>

        {/* =========================================
            SECURITY FOOTER
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
          className="
            mt-6
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-emerald-400/10
            bg-emerald-400/[0.025]
            px-4
            py-3.5
          "
        >
          <ShieldCheck
            size={17}
            className="shrink-0 text-emerald-400"
          />

          <p className="text-[10px] leading-5 text-slate-500 sm:text-xs">
            SmartBank AI notifications help you
            monitor account activity and stay aware
            of important financial events.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;