import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { removeNotification } from "@/store/slices/uiSlice";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function Notifications() {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.ui);

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 5000); // Auto-remove after 5 seconds

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border ${getBackgroundColor(
            notification.type
          )} fade-in`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => dispatch(removeNotification(notification.id))}
                  className="inline-flex text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
