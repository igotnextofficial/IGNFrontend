import React, { ReactNode } from 'react';
import { UserProvider } from '../../providers/UserProvider';
import ErrorProvider from '../../providers/ErrorProvider';

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