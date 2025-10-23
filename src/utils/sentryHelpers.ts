import * as Sentry from "@sentry/react";

const SENSITIVE_KEYS = new Set(["token", "access_token", "refresh_token", "password", "authorization", "email"]);
const DEFAULT_VALIDATION_CODES = new Set([400, 409, 422]);

export const extractErrorMessage = (payload: unknown): string | null => {
    if (!payload) return null;

    if (typeof payload === "string") {
        return payload.trim() ? payload : null;
    }

    if (typeof payload === "object" && payload !== null) {
        const data = payload as Record<string, unknown>;

        if (typeof data.message === "string" && data.message.trim()) {
            return data.message;
        }

        if (typeof data.error === "string" && data.error.trim()) {
            return data.error;
        }

        if (Array.isArray(data.errors)) {
            const messages = data.errors
                .map((value) => (typeof value === "string" ? value.trim() : ""))
                .filter(Boolean);

            if (messages.length) {
                return messages.join(" ");
            }
        }

        if (data.errors && typeof data.errors === "object" && data.errors !== null) {
            const aggregated: string[] = [];
            Object.values(data.errors as Record<string, unknown>).forEach((value) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        if (typeof item === "string" && item.trim()) {
                            aggregated.push(item);
                        }
                    });
                } else if (typeof value === "string" && value.trim()) {
                    aggregated.push(value);
                }
            });

            if (aggregated.length) {
                return aggregated.join(" ");
            }
        }

        if (data.data && data.data !== payload) {
            const nested = extractErrorMessage(data.data);
            if (nested) {
                return nested;
            }
        }
    }

    return null;
};

export const isValidationErrorResponse = (status?: number, payload?: unknown): boolean => {
    if (!status) return false;
    if (status === 422) return true;

    const data = payload as Record<string, unknown> | undefined;
    const hasValidationDetails = Boolean(data && (data.errors || data.validation_errors));

    return hasValidationDetails && (status === 400 || status === 409);
};

const sanitizeValue = (value: unknown): unknown => {
    if (typeof value === "string") {
        return value.length > 200 ? `${value.substring(0, 200)}…` : value;
    }

    if (Array.isArray(value)) {
        return value.slice(0, 5).map(sanitizeValue);
    }

    if (typeof value === "object" && value !== null) {
        const result: Record<string, unknown> = {};
        Object.entries(value).forEach(([key, val]) => {
            if (SENSITIVE_KEYS.has(key.toLowerCase())) {
                result[key] = "[REDACTED]";
            } else {
                result[key] = sanitizeValue(val);
            }
        });
        return result;
    }

    return value;
};

interface CaptureOptions {
    error: unknown;
    url: string;
    method?: string;
    statusCode?: number;
    responsePayload?: unknown;
    extras?: Record<string, unknown>;
}

export const captureSentryException = ({
    error,
    url,
    method,
    statusCode,
    responsePayload,
    extras = {}
}: CaptureOptions) => {
    if (typeof error === "object" && error !== null && (error as { __sentryCaptured?: boolean }).__sentryCaptured) {
        return;
    }

    Sentry.withScope((scope) => {
        if (method) {
            scope.setTag("http.method", method);
        }
        scope.setExtra("http.url", url);

        if (statusCode) {
            scope.setTag("http.status_code", String(statusCode));
        }

        if (responsePayload) {
            scope.setExtra("response", sanitizeValue(responsePayload));
        }

        Object.entries(extras).forEach(([key, value]) => scope.setExtra(key, value));
        Sentry.captureException(error);
    });

    if (typeof error === "object" && error !== null) {
        (error as { __sentryCaptured?: boolean }).__sentryCaptured = true;
    }
};
