import { useState, useEffect } from "react";

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    data?: Record<string, any>; // JSON data wrapped in a `data` object
    body?: FormData;            // FormData for media uploads
}

const useFetch = (url: string, options: FetchOptions = { method: 'GET' }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [responseStatus, setResponseStatus] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Determine if we're sending JSON data or FormData
                const isJsonData = options.data !== undefined;
                const isFormData = options.body instanceof FormData;

                const response = await fetch(url, {
                    method: options.method,
                    headers: isFormData ? options.headers : {
                        'Content-Type': 'application/json',
                        ...options.headers,
                    },
                    body: options.method !== 'GET'
                        ? isFormData
                            ? options.body
                            : JSON.stringify({ data: options.data }) // Wrap JSON data in `data` object
                        : null,
                });

                const responseData = await response.json();
                setData(responseData);
                setResponseStatus(response.status);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error, responseStatus };
};

export default useFetch;
