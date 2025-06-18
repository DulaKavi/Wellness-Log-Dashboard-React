import React, { useState } from 'react';
import { LoginForm } from '../components/custom/LoginForm';
import { SignupForm } from '../components/custom/SignupForm';
import { useAuth } from '../context/AuthContext';
import { LoginData, SignupData } from '../types';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    try {
      await login(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      await signup(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--background-color)',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: 'var(--primary-color)',
            marginBottom: '0.5rem'
          }}>
            Wellness Dashboard
          </h1>
          <p className="text-secondary">
            Track your wellness journey with mood, sleep, and activity logging
          </p>
        </div>

        {/* Form */}
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        ) : (
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        )}

        {/* Toggle */}
        <div className="text-center mt-4">
          <p className="text-secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit'
              }}
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};