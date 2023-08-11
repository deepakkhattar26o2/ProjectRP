import React, { createContext, useContext, useState, ReactNode } from 'react';



const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token') || null
    );

    const login = (newToken: string) => {
        setToken(newToken);
        sessionStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType | null => {
    const context = useContext(AuthContext);
    if (!context) {
        return null;
    }
    return context;
};
