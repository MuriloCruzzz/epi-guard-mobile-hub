import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState, User, UserRole } from "@/types";
import { jwtDecode } from "jwt-decode";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
  logout: () => void;
  isTokenExpired: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
  exp: number;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: string;
  department: string;
  location: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  // Check for token in localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("epi_token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const isExpired = new Date(decodedToken.exp * 1000) < new Date();

        if (isExpired) {
          localStorage.removeItem("epi_token");
          setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null
          });
        } else {
          setAuthState({
            token,
            user: decodedToken.user,
            isAuthenticated: true,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        localStorage.removeItem("epi_token");
        setAuthState({
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: "Invalid token"
        });
      }
    } else {
      setAuthState({ ...authState, loading: false });
    }
  }, []);

  const isTokenExpired = (): boolean => {
    const { token } = authState;
    if (!token) return true;

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return new Date(decodedToken.exp * 1000) < new Date();
    } catch (error) {
      return true;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState({ ...authState, loading: true });

    try {
      // In a real app, this would be an API call
      // For now we'll mock a JWT token response
      const mockUser: User = {
        id: "12345",
        name: "Ricardo Paixão",
        role: UserRole.EMPLOYEE,
        company: "CONSERVAÇÃO DE VEÍCULOS TAUBATÉ",
        companyId: "VW-TAU",
        position: "Técnico em Manutenção",
        phone: "+55 12 99799 9578"
      };

      // Create a mock JWT that expires in 1 hour
      const expTime = Math.floor(Date.now() / 1000) + 60 * 60;
      const tokenPayload = {
        user: mockUser,
        exp: expTime
      };

      // Base64 encode the payload to simulate a JWT
      const tokenString = btoa(JSON.stringify(tokenPayload));
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${tokenString}.mockSignature`;

      localStorage.setItem("epi_token", mockToken);

      setAuthState({
        token: mockToken,
        user: mockUser,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: "Login failed. Please check your credentials."
      });
    }
  };

  const loginWithBiometric = async (): Promise<void> => {
    setAuthState({ ...authState, loading: true });

    try {
      // In a real app, this would trigger biometric authentication
      // For now we'll just simulate a successful biometric auth
      setTimeout(() => {
        const mockUser: User = {
          id: "12345",
          name: "Ricardo Paixão",
          role: UserRole.EMPLOYEE,
          company: "CONSERVAÇÃO DE VEÍCULOS TAUBATÉ",
          companyId: "VW-TAU",
          position: "Técnico em Manutenção",
          phone: "+55 12 99799 9578"
        };

        // Create a mock JWT that expires in 1 hour
        const expTime = Math.floor(Date.now() / 1000) + 60 * 60;
        const tokenPayload = {
          user: mockUser,
          exp: expTime
        };

        // Base64 encode the payload to simulate a JWT
        const tokenString = btoa(JSON.stringify(tokenPayload));
        const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${tokenString}.mockSignature`;

        localStorage.setItem("epi_token", mockToken);

        setAuthState({
          token: mockToken,
          user: mockUser,
          isAuthenticated: true,
          loading: false,
          error: null
        });
      }, 1500);
    } catch (error) {
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: "Biometric authentication failed."
      });
    }
  };

  const logout = (): void => {
    localStorage.removeItem("epi_token");
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loginWithBiometric,
        logout,
        isTokenExpired
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
