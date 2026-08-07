import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useNotifications } from "../../context/NotificationContext";

// ==========================================
// STYLE CONFIG BY TYPE
// ==========================================

const getConfig = (type) => {
  switch (type) {
    case "error":
      return {
        icon: AlertCircle,
        container: "border-red-400/20 bg-red-950/90",
        iconBox:
          "border-red-400/20 bg-red-400/10 text-red-400",
        title: "text-red-300",
        progress: "bg-red-400",
      };

    case "info":
      return {
        icon: Info,
        container: "border-blue-400/20 bg-blue-950/90",
        iconBox:
          "border-blue-400/20 bg-blue-400/10 text-blue-400",
        title: "text-blue-300",
        progress: "bg-blue-400",
      };

    default:
      return {
        icon: CheckCircle2,
        container:
          "border-emerald-400/20 bg-slate-950/95",
        iconBox:
          "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
        title: "text-emerald-300",
        progress: "bg-emerald-400",
      };
  }
};

// ==========================================
// COMPONENT
// ==========================================

const NotificationPopup = () => {
  console.log("[Notification] NotificationPopup render()");

  const { toast, closeNotification } = useNotifications();

  console.log("[Notification] NotificationPopup sees toast:", toast);

  const config = getConfig(toast?.type);
  const ToastIcon = config.icon;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{
            opacity: 0,
            y: -20,
            x: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
            x: 30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          role="alert"
          aria-live="polite"
          className="
            fixed
            right-4
            top-20
            z-[999999]
            w-[calc(100%-2rem)]
            max-w-md
            sm:right-6
            sm:top-24
          "
        >
          <div
            className={`
              relative
              overflow-hidden
              rounded-2xl
              border
              p-4
              shadow-2xl
              shadow-black/70
              backdrop-blur-xl
              ${config.container}
            `}
          >
            <div className="flex items-start gap-3">
              {/* ICON */}

              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  ${config.iconBox}
                `}
              >
                <ToastIcon size={21} strokeWidth={2} />
              </div>

              {/* CONTENT */}

              <div className="min-w-0 flex-1">
                <p
                  className={`
                    text-sm
                    font-bold
                    ${config.title}
                  `}
                >
                  {toast.title}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-slate-300
                  "
                >
                  {toast.message}
                </p>

                <p
                  className="
                    mt-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-slate-600
                  "
                >
                  SmartBank AI
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={closeNotification}
                aria-label="Close notification"
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <X size={14} />
              </button>
            </div>

            {/* PROGRESS */}

            <motion.div
              key={`progress-${toast.id}`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{
                duration: toast.duration / 1000,
                ease: "linear",
              }}
              className={`
                absolute
                bottom-0
                left-0
                h-[2px]
                ${config.progress}
              `}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;