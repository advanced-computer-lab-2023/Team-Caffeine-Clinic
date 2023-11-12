import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function ProtectedRoute({ children }) {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;