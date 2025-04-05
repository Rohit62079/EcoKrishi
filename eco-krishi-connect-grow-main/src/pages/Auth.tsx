
import React from 'react';
import { useNavigate } from "react-router-dom";
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';

type AuthPageProps = {
  type: 'sign-in' | 'sign-up';
};

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  return (
    <MainLayout>
      <div className="eco-container py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 border border-gray-100">
          {type === 'sign-in' ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-eco-dark">Welcome Back to EcoKrishi</h2>
              <SignInForm signUpUrl="/sign-up" />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-eco-dark">Join the EcoKrishi Community</h2>
              <SignUpForm signInUrl="/sign-in" />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
