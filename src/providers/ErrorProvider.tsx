import { useCallback, useMemo, useState, ReactNode } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const updateError = useCallback((error = "") => {
        console.log("error message updated to ", error);
        setErrorMessage(error);
    }, []);

    const contextValue = useMemo(() => ({
        error: errorMessage,
        updateError
    }), [errorMessage, updateError]);

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorProvider;
