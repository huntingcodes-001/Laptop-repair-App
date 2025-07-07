import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (!userProfile) {
        navigate('/setup-profile');
      } else {
        navigate(`/dashboard/${userProfile.role}`);
      }
    }
  }, [user, userProfile, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your repair dashboard and manage your orders
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <Auth
            supabaseClient={supabase}
            providers={['google']}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#3B82F6',
                    brandAccent: '#2563EB',
                  },
                },
              },
            }}
            redirectTo={`${window.location.origin}/setup-profile`}
          />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            You can sign up with email/password or Google.
            <br />
            <span className="text-xs text-gray-500">
              Note: Google OAuth requires proper redirect URI configuration in production.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;