import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const timerRef = useRef(null);

  // ==========================================
  // CLEAR TIMER
  // ==========================================

  const clearToastTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ==========================================
  // SHOW NOTIFICATION
  // ==========================================

  const showNotification = useCallback(
    ({
      title = "Notification",
      message = "",
      type = "success",
      duration = 4500,
    } = {}) => {
      clearToastTimer();

      const notification = {
        id: Date.now(),
        title,
        message,
        type,
        duration,
      };

      setToast(notification);

      timerRef.current = window.setTimeout(() => {
        setToast(null);
        timerRef.current = null;
      }, duration);
    },
    [clearToastTimer]
  );

  // ==========================================
  // BACKWARD COMPATIBILITY
  // ==========================================

  const addNotification = useCallback(
    (notification) => {
      showNotification(notification);
    },
    [showNotification]
  );

  // ==========================================
  // CLOSE
  // ==========================================

  const closeNotification = useCallback(() => {
    clearToastTimer();
    setToast(null);
  }, [clearToastTimer]);

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      clearToastTimer();
    };
  }, [clearToastTimer]);

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <NotificationContext.Provider
      value={{
        toast,
        showNotification,
        addNotification,
        closeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// ==========================================
// HOOK
// ==========================================

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
};

export default NotificationContext;