import {
    captureSentryException,
    extractErrorMessage,
    isValidationErrorResponse
} from "./sentryHelpers";

interface SafeFetchOptions extends RequestInit {
    capture?: boolean;
    validationStatusCodes?: number[];
    requestName?: string;
}

export class SafeFetchError extends Error {
    status?: number;
    payload?: unknown;
    isValidationError: boolean;
    response?: Response;

    constructor(
        message: string,
        params: {
            status?: number;
            payload?: unknown;
            isValidationError: boolean;
            response?: Response;
        }
    ) {
        super(message);
        this.name = "SafeFetchError";
        this.status = params.status;
        this.payload = params.payload;
        this.isValidationError = params.isValidationError;
        this.response = params.response;
    }
}

const DEFAULT_VALIDATION_STATUS_CODES = [400, 409, 422];

const resolveUrl = (input: RequestInfo | URL): string => {
    if (typeof input === "string") {
        return input;
    }
    if (input instanceof URL) {
        return input.href;
    }
    if (typeof Request !== "undefined" && input instanceof Request) {
        return input.url;
    }
    return "unknown";
};

const parseResponsePayload = async (response: Response): Promise<unknown> => {
    const cloned = response.clone();
    try {
        return await cloned.json();
    } catch {
        try {
            const text = await cloned.text();
            return text ? text : null;
        } catch {
            return null;
        }
    }
};

export const safeFetch = async (input: RequestInfo | URL, init: SafeFetchOptions = {}) => {
    const {
        capture = true,
        validationStatusCodes = DEFAULT_VALIDATION_STATUS_CODES,
        requestName,
        ...fetchOptions
    } = init;

    const method = (fetchOptions.method ?? "GET").toUpperCase();
    const url = resolveUrl(input);

    try {
        const response = await fetch(input, fetchOptions);

        if (response.ok) {
            return response;
        }

        const payload = await parseResponsePayload(response);
        const extractedMessage = extractErrorMessage(payload);
        const isValidation =
            isValidationErrorResponse(response.status, payload) ||
            validationStatusCodes.includes(response.status);

        const message =
            extractedMessage ??
            (isValidation
                ? "Please review the highlighted fields and try again."
                : `Request failed with status ${response.status}`);

        const error = new SafeFetchError(message, {
            status: response.status,
            payload,
            isValidationError: isValidation,
            response
        });

        if (capture && !isValidation) {
            captureSentryException({
                error,
                url,
                method,
                statusCode: response.status,
                responsePayload: payload,
                extras: requestName ? { requestName } : {}
            });
        }

        throw error;
    } catch (error: unknown) {
        if (error instanceof SafeFetchError) {
            throw error;
        }

        if (capture) {
            captureSentryException({
                error,
                url,
                method,
                extras: requestName ? { requestName } : {}
            });
        }

        throw error;
    }
};

