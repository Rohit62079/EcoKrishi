
import React, { createContext, useContext, useState } from 'react';

// Create a mock context that mimics Clerk's auth context
const MockAuthContext = createContext({
  isSignedIn: false,
  isLoaded: true,
  signOut: () => Promise.resolve(),
  user: null as any,
});

// Mock User Provider
export const MockUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Mock user context value
  const mockUserValue = {
    isSignedIn,
    isLoaded: true,
    signOut: () => {
      setIsSignedIn(false);
      setUser(null);
      return Promise.resolve();
    },
    user,
  };

  return (
    <MockAuthContext.Provider value={mockUserValue}>
      {children}
    </MockAuthContext.Provider>
  );
};

// Use this hook in place of useAuth when in development mode without Clerk
export const useMockAuth = () => useContext(MockAuthContext);

// Mock components to replace Clerk components in development
export const MockSignIn = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Mock Sign In (Dev Mode)</h2>
    <p className="mb-4">This is a mock sign-in component for development.</p>
    <p className="text-sm text-gray-500">
      Add a valid Clerk publishable key to enable real authentication.
    </p>
  </div>
);

export const MockSignUp = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Mock Sign Up (Dev Mode)</h2>
    <p className="mb-4">This is a mock sign-up component for development.</p>
    <p className="text-sm text-gray-500">
      Add a valid Clerk publishable key to enable real authentication.
    </p>
  </div>
);

// Mock ClerkLoaded and ClerkLoading components
export const MockClerkLoaded = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const MockClerkLoading = ({ children }: { children: React.ReactNode }) => null;

// Mock SignedIn and SignedOut components
export const MockSignedIn = ({ children }: { children: React.ReactNode }) => 
  useMockAuth().isSignedIn ? <>{children}</> : null;

export const MockSignedOut = ({ children }: { children: React.ReactNode }) => 
  !useMockAuth().isSignedIn ? <>{children}</> : null;

// Mock UserButton component
export const MockUserButton = () => (
  <button className="rounded-full w-9 h-9 bg-gray-200 flex items-center justify-center">
    <span className="text-xs">User</span>
  </button>
);
