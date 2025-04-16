import { useState, useCallback } from "react";
import { HttpMethods, HttpHeaders, httpDataObject } from "../types/DataTypes";
import { useUser } from "../contexts/UserContext";
import { useErrorHandler } from "../contexts/ErrorContext";

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
export default function useHttp() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const { accessToken } = useUser();
    const { updateError } = useErrorHandler();

    const request = useCallback(async <T = any>(
        url: string,
        options: HttpOptions = {}
    ): Promise<HttpResponse<T>> => {
        setLoading(true);
        setError(null);
        setStatus(null);

        try {
            const {
                method = HttpMethods.GET,
                data,
                headers = {},
                hasMedia = false,
                requiresAuth = true
            } = options;

            // Prepare request options
            const requestOptions: RequestInit = {
                method,
                headers: {
                    ...headers,
                    ...(requiresAuth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                    ...(hasMedia ? {} : { 'Content-Type': 'application/json' })
                },
                credentials: 'include'
            };

            // Add body for non-GET requests
            if (method !== HttpMethods.GET && data) {
                // Check if data is already wrapped in a data object
                const isAlreadyWrapped = data && typeof data === 'object' && 'data' in data;
                
                // Only wrap data if it's not already wrapped and not a FormData object
                const requestData = hasMedia || isAlreadyWrapped ? data : { data };
                requestOptions.body = hasMedia ? requestData : JSON.stringify(requestData);
            }

            // Make the request
            const response = await fetch(url, requestOptions);
            setStatus(response.status);
            
            // Handle non-OK responses
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // Parse response
            const responseData = await response.json();
            
            return {
                data: responseData,
                status: response.status,
                headers: Object.fromEntries(response.headers.entries()) as HttpHeaders
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            updateError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [accessToken, updateError]);

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