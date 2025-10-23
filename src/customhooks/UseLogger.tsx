import { useCallback } from "react";
import { safeFetch } from "../utils/safeFetch";

const useLogger = () => {
    const logError = useCallback((error: Error | string, context?: string) => {
        const errorMessage = typeof error === "string" ? error : error.message;
        const errorStack = typeof error === "string" ? null : error.stack;

        const logData = {
            message: errorMessage,
            stack: errorStack,
            context: context || "Unknown Context",
            timestamp: new Date().toISOString(),
        };

        // ✅ Log to the console (only in development)
        if (process.env.NODE_ENV !== "production") {
            console.error("❌ ERROR:", logData);
        }

        // 🔥 Send to external logging service in production
        if (process.env.NODE_ENV === "production") {
            safeFetch("/api/log-error", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logData),
                capture: false
            }).catch((err) => console.error("❌ Failed to log error:", err));
        }
    }, []);

    return { logError };
};

export default useLogger;
