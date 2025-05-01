import React, { ReactNode } from 'react';
import { UserProvider } from '../../providers/UserProvider';
import ErrorProvider from '../../providers/ErrorProvider';
import HttpRequestProvider from '../../providers/HttpRequestProvider';
import { QueryClientProvider } from '../../providers/QueryClientProvider';

interface RootComponentProps {
    children: ReactNode;
}

const RootComponent: React.FC<RootComponentProps> = ({ children }) => {
    return (
        <QueryClientProvider>
            <UserProvider>
                <ErrorProvider>
                    {children}
                </ErrorProvider>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default RootComponent;
