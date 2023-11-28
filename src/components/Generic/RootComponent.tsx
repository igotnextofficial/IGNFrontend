import React, { ReactNode } from 'react';
import { UserProvider } from '../../Providers/UserProvider';
import ErrorProvider from '../../Providers/ErrorProvider';

interface RootComponentProps {
    children: ReactNode;
}

const RootComponent: React.FC<RootComponentProps> = ({ children }) => {
    return (
        <UserProvider>
            <ErrorProvider>
                {children}
            </ErrorProvider>
        </UserProvider>
    );
};

export default RootComponent;
