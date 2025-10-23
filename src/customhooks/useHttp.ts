import { useState, useCallback, useEffect, useRef } from "react";
import { HttpMethods, HttpHeaders, httpDataObject } from "../types/DataTypes";
import { useErrorHandler } from "../contexts/ErrorContext";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useUser } from '../contexts/UserContext';
import { APP_ENDPOINTS } from '../config/app';
import {
    captureSentryException,
    extractErrorMessage,
    isValidationErrorResponse
} from "../utils/sentryHelpers";

interface HttpOptions {
    method?: HttpMethods;
    headers?: HttpHeaders;
    data?: any;
    requiresAuth?: boolean;
    hasMedia?: boolean;
}

interface HttpResponse<T = any> {
    data: T;
    status: number;
    headers: HttpHeaders;
}

/**
 * Enhanced HTTP hook with TypeScript generics, automatic authentication,
 * consistent error handling, media upload support, and loading/status tracking.
 * 
 * Features:
 * - Automatic authentication via useUser hook
 * - Type-safe responses with generics
 * - Consistent error handling
 * - Media upload support
 * - Loading and status tracking
 * - Automatic data wrapping in a data object
 * - Helper methods for common HTTP operations (GET, POST, PUT, DELETE)
 * 
 * @example
 * // Basic GET request
 * const { get } = useHttp();
 * const { data, loading, error } = await get('/api/users');
 * 
 * @example
 * // POST request with data
 * const { post } = useHttp();
 * const { data, loading, error } = await post('/api/users', { name: 'John' });
 * 
 * @example
 * // PUT request with data
 * const { put } = useHttp();
 * const { data, loading, error } = await put('/api/users/1', { name: 'John' });
 * 
 * @example
 * // DELETE request
 * const { del } = useHttp();
 * const { data, loading, error } = await del('/api/users/1');
 * 
 * @example
 * // File upload
 * const { request } = useHttp();
 * const formData = new FormData();
 * formData.append('file', file);
 * const { data, loading, error } = await request('/api/upload', {
 *   method: HttpMethods.POST,
 *   data: formData,
 *   hasMedia: true
 * });
 */
export default function useHttp(initialToken?: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const { updateError } = useErrorHandler();

    const { accessToken: contextToken } = useUser();
    const tokenRef = useRef(initialToken || contextToken);

    // Sync latest token into the ref
    useEffect(() => {
        tokenRef.current = initialToken || contextToken;
    }, [initialToken, contextToken]);

    const request = useCallback(async <T = any>(
        url: string,
        options: HttpOptions = {}
    ): Promise<HttpResponse<T>> => {
        setLoading(true);
        setError(null);
        setStatus(null);

        const token = tokenRef.current;
        const {
            method = HttpMethods.GET,
            data,
            headers = {},
            hasMedia = false,
            requiresAuth = true
        } = options;

        try {
            // Prepare request options
            const requestOptions: AxiosRequestConfig = {
                method,
                headers: {
                    ...headers,
                    ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
                    ...(hasMedia ? {} : { 'Content-Type': 'application/json' })
                },
                withCredentials: true
            };

            // Add body for non-GET requests
            if (method !== HttpMethods.GET && data) {
                // Check if data is already wrapped in a data object
                const isAlreadyWrapped = data && typeof data === 'object' && 'data' in data;
                
                // Only wrap data if it's not already wrapped and not a FormData object
                const requestData = hasMedia || isAlreadyWrapped ? data : { data };
                requestOptions.data = hasMedia ? requestData : JSON.stringify(requestData);
            }

            // Make the request
            const response: AxiosResponse<T> = await axios({
                url,
                ...requestOptions
            });
            
            setStatus(response.status);
            
            return {
                data: response.data,
                status: response.status,
                headers: response.headers as HttpHeaders
            };
        } catch (err: unknown) {
            let userMessage = err instanceof Error && err.message
                ? err.message
                : 'An unknown error occurred';
            let statusCode: number | undefined;
            let responsePayload: unknown;
            let shouldCapture = true;
            const isAxiosError = axios.isAxiosError(err);

            if (isAxiosError) {
                const axiosError = err as AxiosError;
                statusCode = axiosError.response?.status;
                responsePayload = axiosError.response?.data;

                setStatus(statusCode ?? null);

                const extractedMessage = extractErrorMessage(responsePayload);
                if (extractedMessage) {
                    userMessage = extractedMessage;
                    axiosError.message = extractedMessage;
                }

                if (isValidationErrorResponse(statusCode, responsePayload)) {
                    shouldCapture = false;
                    if (!extractedMessage) {
                        userMessage = "Please review the highlighted fields and try again.";
                        axiosError.message = userMessage;
                    }
                }
            }

            setError(userMessage);
            updateError(userMessage);

            if (shouldCapture) {
                const requestUrl = isAxiosError ? (err as AxiosError).config?.url ?? url : url;
                captureSentryException({
                    error: err,
                    url: requestUrl,
                    method,
                    statusCode,
                    responsePayload,
                    extras: {
                        requiresAuth
                    }
                });
            }

            throw err;
        } finally {
            setLoading(false);
        }
    }, [updateError]);

    // Helper method for GET requests
    const get = useCallback(<T = any>(
        url: string,
        options: Omit<HttpOptions, 'method' | 'data'> = {}
    ): Promise<HttpResponse<T>> => {
        return request<T>(url, { ...options, method: HttpMethods.GET });
    }, [request]);

    // Helper method for POST requests
    const post = useCallback(<T = any>(
        url: string,
        data?: any,
        options: Omit<HttpOptions, 'method' | 'data'> = {}
    ): Promise<HttpResponse<T>> => {
        return request<T>(url, { ...options, method: HttpMethods.POST, data });
    }, [request]);

    // Helper method for PUT requests
    const put = useCallback(<T = any>(
        url: string,
        data?: any,
        options: Omit<HttpOptions, 'method' | 'data'> = {}
    ): Promise<HttpResponse<T>> => {
        return request<T>(url, { ...options, method: HttpMethods.PUT, data });
    }, [request]);

    // Helper method for DELETE requests
    const del = useCallback(<T = any>(
        url: string,
        options: Omit<HttpOptions, 'method'> = {}
    ): Promise<HttpResponse<T>> => {
        return request<T>(url, { ...options, method: HttpMethods.DELETE });
    }, [request]);

    return {
        request,
        get,
        post,
        put,
        del,
        loading,
        error,
        status
    };
} 
