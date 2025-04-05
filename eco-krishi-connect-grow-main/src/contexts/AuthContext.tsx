
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our auth context
type User = {
  id: string;
  fullName: string;
  email: string;
  imageUrl?: string;
};

type AuthContextType = {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('eco-krishi-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll allow any email/password combination
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      fullName: email.split('@')[0], // Use part of email as name
      email: email,
    };
    
    // Save user to localStorage
    localStorage.setItem('eco-krishi-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      fullName: name,
      email: email,
    };
    
    // Save user to localStorage
    localStorage.setItem('eco-krishi-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Sign out function
  const signOut = async () => {
    // Clear user from localStorage
    localStorage.removeItem('eco-krishi-user');
    setUser(null);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!user,
        isLoaded,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Components to conditionally render based on auth state
export const SignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <>{children}</> : null;
};

export const SignedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();
  return !isSignedIn ? <>{children}</> : null;
};
