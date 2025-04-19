import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Home, AlertCircle, Check } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'tenant' | 'owner'>('tenant');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Lowercase and uppercase letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    
    // Numbers
    if (/\d/.test(password)) strength += 1;
    
    // Special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  
  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Uppercase and lowercase letters', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { text: 'At least one number', met: /\d/.test(password) },
    { text: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-light-300 dark:bg-dark-300';
    if (passwordStrength === 1) return 'bg-error-500';
    if (passwordStrength === 2) return 'bg-warning-500';
    if (passwordStrength === 3) return 'bg-primary-500';
    return 'bg-success-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Please use a stronger password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error, data } = await signUp(email, password, {
        fullName,
        role,
      });
      
      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 flex flex-col">
      <header className="py-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary-600 dark:text-primary-500">
            <Home size={28} strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold tracking-tight">LILL KOST</span>
        </Link>
      </header>
      
      <div className="flex flex-grow items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-dark-200 rounded-xl shadow-soft p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-dark-500 dark:text-light-400">
              Join LILL KOST and find your perfect home
            </p>
          </div>
          
          {error && (
            <div className="bg-error-100 dark:bg-error-900/30 text-error-800 dark:text-error-200 p-3 rounded-lg mb-6 flex items-start gap-2">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-dark-700 dark:text-light-300 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-dark-700 dark:text-light-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="account-type" className="block text-dark-700 dark:text-light-300 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('tenant')}
                  className={`p-3 rounded-lg border-2 text-center font-medium transition-colors ${
                    role === 'tenant'
                      ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'border-light-300 dark:border-dark-300 text-dark-500 dark:text-light-400'
                  }`}
                >
                  Tenant
                </button>
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`p-3 rounded-lg border-2 text-center font-medium transition-colors ${
                    role === 'owner'
                      ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'border-light-300 dark:border-dark-300 text-dark-500 dark:text-light-400'
                  }`}
                >
                  Property Owner
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-dark-700 dark:text-light-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-500 dark:text-light-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex-grow flex gap-1">
                      {[1, 2, 3, 4].map((index) => (
                        <div 
                          key={index}
                          className={`h-1 flex-grow rounded-full ${
                            index <= passwordStrength ? getPasswordStrengthColor() : 'bg-light-300 dark:bg-dark-300'
                          }`} 
                        />
                      ))}
                    </div>
                    {password && (
                      <span className="text-xs ml-2 text-dark-500 dark:text-light-400">
                        {getPasswordStrengthText()}
                      </span>
                    )}
                  </div>
                  
                  <ul className="space-y-1 mt-2">
                    {passwordRequirements.map((req, index) => (
                      <li key={index} className="flex items-center text-xs gap-1.5">
                        {req.met ? (
                          <Check size={12} className="text-success-500" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-dark-300 dark:border-light-500" />
                        )}
                        <span className={req.met ? 'text-success-600 dark:text-success-400' : 'text-dark-500 dark:text-light-400'}>
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-dark-700 dark:text-light-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input ${confirmPassword && password !== confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                placeholder="••••••••"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-error-600 text-sm mt-1">Passwords do not match</p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <p className="text-center mt-6 text-dark-500 dark:text-light-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;